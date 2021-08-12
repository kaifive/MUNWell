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
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CSelect
} from '@coreui/react'
import { Export } from 'src/reusable'
import { Redirect } from 'react-router-dom'

import fetchData from '../../data/LiveData/FetchData'

import { getAwardTypes, getPositions, getAllDelegations, exportTable, } from './awardHelper'

let header = ""
let status = true
let editItem;

const Award = ({ match: { params: { committee } } }) => {
    const { user } = useAuth0()

    const [modalAdd, setModalAdd] = useState(false)

    const [awardsState, setAwardsState] = useState({
        type: '',
        position: '',
        delegation: '',
        delegate1: '',
        delegate2: ''
    })

    const [data, setData] = useState({
        awards: [],
        committee: [],
        registrationData: [],
        awardTypes: [],
        redirect: false
    })

    const [fields, setFields] = useState([
        'type',
        'position',
        'delegation',
        {
            key: 'delegate1',
            label: 'Delegate I'
        },
        'actions'
    ])

    async function getData() {
        await fetchData("/api/get/individualAward", user.sub, 'position').then((res) => {
            let awards = []
            let i;

            for (i = 0; i < res.length; i++) {
                console.log(res[i]._id)
                if (res[i]._id === committee) {
                    awards.push(res[i])
                }
            }

            if (JSON.stringify(awards) !== JSON.stringify(data.awards)) {
                setData(prevState => {
                    return { ...prevState, awards: awards }
                })
            }
        })

        await fetchData('/api/get/registrationData', user.sub).then((res) => {
            if (JSON.stringify(res) !== JSON.stringify(data.registrationData)) {
                setData(prevState => {
                    return { ...prevState, registrationData: res }
                })
            }
        })

        await fetchData('/api/get/awardType', user.sub).then((res) => {
            if (JSON.stringify(res) !== JSON.stringify(data.awardTypes)) {
                setData(prevState => {
                    return { ...prevState, awardTypes: res }
                })
            }
        })

        await fetchData('/api/get/committee', user.sub).then((res) => {
            let i;
            for (i = 0; i < res.length; i++) {
                if (res[i]._id === committee) {
                    let committeeData = res[i]

                    if (JSON.stringify(committeeData) !== JSON.stringify(data.committee)) {
                        setData(prevState => {
                            return { ...prevState, committee: committeeData }
                        })
                    }
                }
            }

            if (data.committee.length === 0) {
                setData(prevState => {
                    return { ...prevState, redirect: true }
                })
            } else {
                if (data.committee.type === "Double Delegation") {
                    setFields([
                        'type',
                        'position',
                        'delegation',
                        {
                            key: 'delegate1',
                            label: 'Delegate I'
                        },
                        {
                            key: 'delegate2',
                            label: 'Delegate II'
                        },
                        'actions'
                    ])
                }
            }
        })
    }

    function openModal() {
        setAwardsState({
            type: '',
            position: '',
            delegation: '',
            delegate1: '',
            delegate2: ''
        })

        header = "Add Award"
        status = true

        setModalAdd(!modalAdd)
    }

    function addAwards(event) {
        event.preventDefault();

        const payload = {
            user: user.sub,
            committee: data.committee.committee,
            type: awardsState.type,
            position: awardsState.position,
            delegation: awardsState.delegation,
            delegate1: awardsState.delegate1,
            delegate2: awardsState.delegate2
        }

        axios({
            url: '/api/save/individualAward',
            method: 'POST',
            data: payload
        })
            .then(() => {
                console.log('Data has been sent to the server')
                if (!status) {
                    deleteAwards(editItem)
                }
            })
            .catch(() => {
                console.log('Internal server error')
            })

        fetchData("/api/get/individualAward", user.sub, 'position').then((res) => {
            let awards = []
            let i;

            for (i = 0; i < res.length; i++) {
                if (res[i]._id === committee) {
                    awards.push(res[i])
                }
            }

            setData(prevState => {
                return { ...prevState, awards: awards }
            })
        })

        setModalAdd(false)
    }

    function editAwards(item) {
        setAwardsState({
            type: item.type,
            position: item.position,
            delegation: item.delegation,
            delegate1: item.delegate1,
            delegate2: item.delegate2
        })

        header = "Edit Award"
        status = false
        editItem = item

        setModalAdd(!modalAdd)
    }

    function deleteAwards(item) {
        axios.delete('/api/delete/individualAward', {
            data: {
                id: item._id,
            },
        });

        fetchData("/api/get/individualAward", user.sub, 'position').then((res) => {
            let awards = []
            let i;

            for (i = 0; i < res.length; i++) {
                if (res[i]._id === committee) {
                    awards.push(res[i])
                }
            }

            setData(prevState => {
                return { ...prevState, awards: awards }
            })
        })
    }

    getData()

    console.log("Here", data.awards)

    return data.committee.length !== 0 ? (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            {data.committee.committee} - Individual Awards
                            <Export data={exportTable(data.committee, data.awards)} filename={data.committee.committee + " Awards.csv"} />
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="align-items-left">
                                <CCol lg="3">
                                    <CButton block color="primary" onClick={() => openModal()}>Add New</CButton>
                                </CCol>
                            </CRow>
                            <br></br>
                            <CDataTable
                                items={data.awards}
                                fields={fields}
                                hover
                                striped
                                sorter
                                itemsPerPage={50}
                                pagination
                                scopedSlots={{
                                    'actions':
                                        (item) => (
                                            <td>
                                                <CDropdown className="m-1">
                                                    <CDropdownToggle color="secondary">
                                                        Select Action
                                                    </CDropdownToggle>
                                                    <CDropdownMenu>
                                                        <CDropdownItem onClick={() => editAwards(item)}>Edit</CDropdownItem>
                                                        <CDropdownItem onClick={() => deleteAwards(item)}>Delete</CDropdownItem>
                                                    </CDropdownMenu>
                                                </CDropdown>
                                            </td>
                                        )
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CModal show={modalAdd} onClose={setModalAdd} size="lg">
                <CModalHeader>
                    <CModalTitle>{header}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="award-type">Award Type</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CSelect custom name="awardType" value={awardsState.type} onChange={e => {
                                    const val = e.target.value
                                    setAwardsState(prevState => {
                                        return { ...prevState, type: val }
                                    });
                                }}>
                                    {getAwardTypes(data.awardTypes)}
                                </CSelect>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="award-pos">Position</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CSelect custom name="awardPos" value={awardsState.position} onChange={e => {
                                    const val = e.target.value
                                    setAwardsState(prevState => {
                                        return { ...prevState, position: val }
                                    });
                                }}>
                                    {getPositions(data.committee)}
                                </CSelect>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="award-delegation">Delegation</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CSelect custom name="select" id="award-delegation" value={awardsState.delegation} onChange={e => {
                                    const val = e.target.value
                                    setAwardsState(prevState => {
                                        return { ...prevState, delegation: val }
                                    });
                                }}>
                                    {getAllDelegations(data.committee, data.registrationData)}
                                </CSelect>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="award-del1">Delegate I Name</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput name="awardDel1" placeholder="Delegate I Name" value={awardsState.delegate1} onChange={e => {
                                    const val = e.target.value
                                    setAwardsState(prevState => {
                                        return { ...prevState, delegate1: val }
                                    });
                                }} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row hidden={!data.committee.type.includes("Double Delegation")}>
                            <CCol md="3">
                                <CLabel htmlFor="award-del2">Delegate II Name</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput name="awardDel2" placeholder="Delegate II Name" value={awardsState.delegate2} onChange={e => {
                                    const val = e.target.value
                                    setAwardsState(prevState => {
                                        return { ...prevState, delegate2: val }
                                    });
                                }} />
                            </CCol>
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalAdd(false)}>Cancel</CButton>
                    <CButton color="primary" onClick={event => addAwards(event)}>Submit</CButton>
                </CModalFooter>
            </CModal>
        </>
    ) : ((data.redirect) ? <Redirect to={{ pathname: "/404" }} /> : <p>Waiting for Data...</p>)
}

export default Award