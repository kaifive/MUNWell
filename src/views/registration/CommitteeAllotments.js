import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CForm,
    CFormGroup,
    CInput,
    CInputCheckbox,
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CSelect,
    CTextarea
} from '@coreui/react'
import { Export } from 'src/reusable'


import fetchData from '../../data/LiveData/FetchData'
import { checkLicense } from 'src/reusable/checkLicense';

import allotmentData from '../../data/MockData/MockAllotments'

import { exportTable } from './committeeAllotmentsHelper'

let editItem;

const CommitteeAllotments = () => {
    const { user } = useAuth0()
    const { isAuthenticated } = useAuth0()

    const [modal, setModal] = useState(false)
    const [modalAllotments, setModalAllotments] = useState(false)

    const [committeeState, setCommitteeState] = useState({
        division: '',
        category: '',
        type: '',
        committee: '',
        abbreviation: '',
        chair: '',
        positions: '',
        assignments: ''
    })

    const [data, setData] = useState({
        registrationData: [],
        committeeData: [],
        allotmentData: []
    });

    const [allotmentsState, setAllotmentsState] = useState('')

    const [isLoading, setIsLoading] = useState(true)

    function editAllotments(item) {
        let i;
        for (i = 0; i < data.allotmentData.length; i++) {
            if (data.allotmentData[i].delegationId === item._id) {
                let allotments = {}
                let init = data.allotmentData[i].allotments.split(",")

                let j;
                for (j = 0; j < init.length; j++) {
                    let arr = init[j].split(":")

                    allotments[arr[0]] = arr[1]
                }
                setAllotmentsState(allotments)
            }
        }

        editItem = item

        setModalAllotments(!modalAllotments)
    }

    function createAllotmentsModal() {
        let rows = []

        let i;
        for (i = 0; i < data.committeeData.length; i++) {
            let committee = data.committeeData[i].committee

            let temp =
                <CFormGroup row>
                    <CCol md="7">
                        <CLabel htmlFor={committee}>{committee}</CLabel>
                    </CCol>
                    <CCol xs="12" md="4">
                        <CInput type="number" min="0" name="numPositions" placeholder="Number of Positions" value={allotmentsState[committee]} onChange={e => {
                            const val = e.target.value

                            setAllotmentsState(prevState => {
                                return { ...prevState, [committee]: val }
                            })
                        }} />
                    </CCol>
                </CFormGroup>

            rows.push(temp)
        }

        return rows
    }

    function openCommitteeModal(committee) {
        let item;

        let i;
        for (i = 0; i < data.committeeData.length; i++) {
            if (data.committeeData[i].committee === committee) {
                item = data.committeeData[i]
            }
        }

        setCommitteeState({
            division: item.division,
            category: item.category,
            type: item.type,
            committee: item.committee,
            abbreviation: item.abbreviation,
            chair: item.chair,
            positions: item.positions,
            assignments: item.assignments
        })

        setModal(!modal)
    }

    function getFields() {
        let committeeList = []

        committeeList[0] = 'delegation'

        if (data.committeeData !== undefined) {
            let i;
            for (i = 0; i < data.committeeData.length; i++) {
                let name;
                let committee = data.committeeData[i].committee
                let temp = data.committeeData[i].assignments.split(",")
                if (data.committeeData[i].abbreviation === '') {
                    name = data.committeeData[i].committee
                } else {
                    name = data.committeeData[i].abbreviation
                }

                let count = 0

                let j;
                for (j = 0; j < temp.length; j++) {
                    if (temp[j] !== '') {
                        count = count + 1
                    }
                }

                let item = {
                    key: name,
                    label: <CButton block variant="outline" color="primary" onClick={() => openCommitteeModal(committee)}> {name + " | " + count} </CButton>
                }

                committeeList[i + 1] = item
            }

            committeeList[i + 1] = 'actions'
        }
        return committeeList
    }

    function getScopedSlots(committeeData) {
        let scopedSlots = {}

        let i;
        for (i = 0; i < committeeData.length; i++) {
            let temp;
            let committee;

            if (committeeData[i].abbreviation === '') {
                temp = committeeData[i].committee
                committee = committeeData[i].committee

                scopedSlots[temp] =
                    (item) => (
                        <td>
                            {getAssigned(item, committee)}
                        </td>
                    )

            } else {
                temp = committeeData[i].abbreviation
                committee = committeeData[i].committee

                scopedSlots[temp] =
                    (item) => (
                        <td>
                            {getAssigned(item, committee)}
                        </td>
                    )
            }
        }

        scopedSlots['actions'] =
            (item) => (
                <td>
                    <CDropdown className="m-1">
                        <CDropdownToggle color="secondary">
                            Select Action
                        </CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem onClick={() => editAllotments(item)}>Edit</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </td>
            )

        return scopedSlots
    }

    function getAssigned(item, committee) {
        let i;
        for (i = 0; i < data.allotmentData.length; i++) {
            if (data.allotmentData[i].delegationId === item._id) {
                let allotments = data.allotmentData[i].allotments.split(",")

                let j;
                for (j = 0; j < allotments.length; j++) {
                    let arr = allotments[j].split(":")

                    if (arr[0] === committee) {
                        return arr[1]
                    }
                }
            }
        }

        return 0
    }

    function submitAllotments(event) {
        event.preventDefault();

        checkLicense(user.sub)
            .then(result => {
                if (result === 0) {
                    alert("No valid Manuel License found! \nUpload a valid Manuel License to be able to configure data.")
                } else {
                    const payload = {
                        allotments: JSON.stringify(allotmentsState).replace(/"/g, "").replace("{", "").replace("}", "")
                    }

                    fetchData("/api/get/allotments", user.sub, 'delegation').then((res) => {
                        let j;
                        for (j = 0; j < res.length; j++) {
                            if (res[j].delegationId === editItem._id) {
                                axios.put('/api/update/allotments', {
                                    data: {
                                        id: res[j]._id,
                                        update: payload
                                    },
                                })
                            }
                        }
                    })
                        .then(() => {
                            alert(editItem.delegation + " allotments updated successfully")

                        })
                        .catch(() => {
                            console.log('Internal server error')
                        })
                }
            })

        setModalAllotments(false)
    }

    async function getData() {
        await fetchData("/api/get/registrationData", user.sub, 'delegates').then((res) => {
            if (JSON.stringify(res) !== JSON.stringify(data.registrationData)) {
                setData(prevState => {
                    return { ...prevState, registrationData: res }
                })
            }
        })

        await fetchData("/api/get/committee", user.sub, 'division').then((res) => {
            if (JSON.stringify(res) !== JSON.stringify(data.committeeData)) {
                setData(prevState => {
                    return { ...prevState, committeeData: res }
                })
            }
        })

        await fetchData("/api/get/allotments", user.sub, 'delegation').then((res) => {
            if (JSON.stringify(res) !== JSON.stringify(data.allotmentData)) {
                setData(prevState => {
                    return { ...prevState, allotmentData: res }
                })
            }
        })
    }

    if (isAuthenticated) {
        getData().then(() => {
            if (isLoading) {
                setIsLoading(false)
            }
        })
    }

    const fields = getFields()

    return !isLoading ? (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Committee Allotments
                            <Export data={exportTable()} filename="CommitteeAllotments.csv" />
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={data.registrationData}
                                fields={fields}
                                hover
                                striped
                                sorter
                                tableFilter
                                itemsPerPageSelect
                                itemsPerPage={10}
                                pagination
                                scopedSlots={
                                    getScopedSlots(data.committeeData)
                                }
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CModal show={modal} onClose={setModal} size="lg">
                <CModalHeader>
                    <CModalTitle>{committeeState.committee}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-category">Committee Category</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CSelect disabled={true} custom name="committeeCategory" value={committeeState.category} onChange={e => {
                                    const val = e.target.value
                                    setCommitteeState(prevState => {
                                        return { ...prevState, category: val }
                                    });
                                }}>
                                    <option value="" disabled>Select Committee Category</option>
                                    <option value="General Assembly">General Assembly</option>
                                    <option value="Specialized Agency">Specialized Agency</option>
                                    <option value="Crisis Committee">Crisis Committee</option>
                                    <option value="Other">Other</option>
                                </CSelect>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-type">Committee Type</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CSelect disabled={true} custom name="committeeType" value={committeeState.type} onChange={e => {
                                    const val = e.target.value
                                    setCommitteeState(prevState => {
                                        return { ...prevState, type: val }
                                    });
                                }}>
                                    <option value="" disabled>Select Committee Type</option>
                                    <option value="Single Delegation">Single Delegation</option>
                                    <option value="Double Delegation">Double Delegation</option>
                                </CSelect>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-division">Committee Division</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CFormGroup variant="custom-checkbox" inline>
                                    <CInputCheckbox disabled={true} custom id="inline-checkbox1" name="middleSchool" checked={(committeeState.division.includes("Middle School"))} onChange={e => {
                                        const middleSchool = e.target.checked
                                        const highSchool = (committeeState.division.includes("High School"))
                                        const university = (committeeState.division.includes("University"))

                                        let val = ''

                                        if (middleSchool) {
                                            val = val + "Middle School, "
                                        }

                                        if (highSchool) {
                                            val = val + "High School, "
                                        }

                                        if (university) {
                                            val = val + "University, "
                                        }

                                        val = val.substring(0, val.length - 2)

                                        setCommitteeState(prevState => {
                                            return { ...prevState, division: val }
                                        })
                                    }} />
                                    <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1">Middle School</CLabel>
                                </CFormGroup>
                                <CFormGroup variant="custom-checkbox" inline>
                                    <CInputCheckbox disabled={true} custom id="inline-checkbox2" name="highSchool" checked={(committeeState.division.includes("High School"))} onChange={e => {
                                        const middleSchool = (committeeState.division.includes("Middle School"))
                                        const highSchool = e.target.checked
                                        const university = (committeeState.division.includes("University"))

                                        let val = ''

                                        if (middleSchool) {
                                            val = val + "Middle School, "
                                        }

                                        if (highSchool) {
                                            val = val + "High School, "
                                        }

                                        if (university) {
                                            val = val + "University, "
                                        }

                                        val = val.substring(0, val.length - 2)

                                        setCommitteeState(prevState => {
                                            return { ...prevState, division: val }
                                        })
                                    }} />
                                    <CLabel variant="custom-checkbox" htmlFor="inline-checkbox2">High School</CLabel>
                                </CFormGroup>
                                <CFormGroup variant="custom-checkbox" inline>
                                    <CInputCheckbox disabled={true} custom id="inline-checkbox3" name="middleSchool" checked={(committeeState.division.includes("University"))} onChange={e => {
                                        const middleSchool = (committeeState.division.includes("Middle School"))
                                        const highSchool = (committeeState.division.includes("High School"))
                                        const university = e.target.checked

                                        let val = ''

                                        if (middleSchool) {
                                            val = val + "Middle School, "
                                        }

                                        if (highSchool) {
                                            val = val + "High School, "
                                        }

                                        if (university) {
                                            val = val + "University, "
                                        }

                                        val = val.substring(0, val.length - 2)

                                        setCommitteeState(prevState => {
                                            return { ...prevState, division: val }
                                        })
                                    }} />
                                    <CLabel variant="custom-checkbox" htmlFor="inline-checkbox3">University</CLabel>
                                </CFormGroup>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-name">Committee Name</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput disabled={true} name="committeeName" placeholder="Committee Name" value={committeeState.committee} onChange={e => {
                                    const val = e.target.value
                                    setCommitteeState(prevState => {
                                        return { ...prevState, committee: val }
                                    });
                                }} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-abbr">Committee Abbreviation</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput disabled={true} name="committeeAbbr" placeholder="Committee Abbreviation" value={committeeState.abbreviation} onChange={e => {
                                    const val = e.target.value
                                    setCommitteeState(prevState => {
                                        return { ...prevState, abbreviation: val }
                                    });
                                }} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-chair">Committee Chair</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput disabled={true} name="committeeChair" placeholder="Committee Chair" value={committeeState.chair} onChange={e => {
                                    const val = e.target.value
                                    setCommitteeState(prevState => {
                                        return { ...prevState, chair: val }
                                    });
                                }} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-positions">Committee Positions</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CTextarea disabled={true} name="committeePositions" rows="9" placeholder="Committee Positions" value={committeeState.positions} onChange={e => {
                                    const val = e.target.value
                                    setCommitteeState(prevState => {
                                        return { ...prevState, positions: val }
                                    });
                                }} />
                            </CCol>
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => setModal(false)}>Close</CButton>
                </CModalFooter>
            </CModal>


            <CModal show={modalAllotments} onClose={setModalAllotments} size="lg">
                <CModalHeader>
                    <CModalTitle>Edit Committee Allotments</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        {createAllotmentsModal()}
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalAllotments(false)}>Cancel</CButton>
                    <CButton color="primary" onClick={event => submitAllotments(event)}>Submit</CButton>
                </CModalFooter>
            </CModal>
        </>
    ) : (<p>Waiting for Data...</p>)
}

export default CommitteeAllotments