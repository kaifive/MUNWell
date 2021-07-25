import React, { useState } from 'react'
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

import registrationData from '../../data/MockData/MockRegistration'
import committeeData from '../../data/MockData/MockCommittees'
import allotmentData from '../../data/MockData/MockAllotments'

const CommitteeAllotments = () => {
    const [modal, setModal] = useState(false)

    const fields = getFields()

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

    function openModal(committee) {
        let item;

        let i;
        for(i = 0; i < committeeData.length; i++) {
            if(committeeData[i].committee === committee) {
                item = committeeData[i]
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

    function exportTable() {
        let data = []

        let i;
        for (i = 0; i < registrationData.length; i++) {
            let entry = {
                "delegation": registrationData[i]["delegation"]
            }

            let j;
            for (j = 0; j < committeeData.length; j++) {
                let name;
                if (committeeData[j].abbreviation === '') {
                    name = committeeData[j].committee
                } else {
                    name = committeeData[j].abbreviation
                }

                entry[name] = getAssigned(registrationData[i], committeeData[j].committee)
            }

            data.push(entry)
        }

        return data
    }

    function getFields() {
        let committeeList = []

        committeeList[0] = 'delegation'

        let i;
        for (i = 0; i < committeeData.length; i++) {
            let name;
            let committee = committeeData[i].committee
            let temp = committeeData[i].assignments.split(",")
            if (committeeData[i].abbreviation === '') {
                name = committeeData[i].committee
            } else {
                name = committeeData[i].abbreviation
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
                label: <CButton block variant="outline" color="primary" onClick={() => openModal(committee)}> {name + " | " + count} </CButton>
            }

            committeeList[i + 1] = item
        }

        committeeList[i + 1] = 'actions'
        return committeeList
    }

    function getAssigned(item, committee) {
        let i;
        for (i = 0; i < allotmentData.length; i++) {
            if (allotmentData[i].delegation === item.delegation) {
                return allotmentData[i].allotments[committee]
            }
        }

        return 0
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
                            <CDropdownItem>Edit</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </td>
            )

        return scopedSlots
    }

    return (
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
                                items={registrationData}
                                fields={fields}
                                hover
                                striped
                                sorter
                                tableFilter
                                itemsPerPageSelect
                                itemsPerPage={10}
                                pagination
                                scopedSlots={
                                    getScopedSlots(committeeData)
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

        </>
    )
}

export default CommitteeAllotments