import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
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
import { participationAwardsPDFLayout1, customParticipationAwardLayout1 } from 'src/reusable/jsPDF'

//import registrationData from '../../data/MockData/MockRegistration'
//import committeeData from '../../data/MockData/MockCommittees'
import fetchData from '../../data/LiveData/FetchData'

import { getDelegations, getCommittees } from './awardHelper'
import { checkLicense } from 'src/reusable/checkLicense';

const fieldsCommittee = [
    'division',
    'category',
    'committee',
    'abbreviation',
    'download'
]

const fieldsDelegation = [
    'delegation',
    'contact',
    'email',
    'download'
]

const ParticipationAwards = () => {
    const { user } = useAuth0()

    const [modalAdd, setModalAdd] = useState(false)

    const [awardsState, setAwardsState] = useState({
        type: '',
        delegate: '',
        position: '',
        delegation: '',
        committee: ''
    })

    const [data, setData] = useState({
        registrationData: [],
        committeeData: [],
        awardTypes: [],
        settings: []
    });

    const [isLoading, setIsLoading] = useState(true)

    function openModal() {
        setAwardsState({
            position: '',
            delegation: '',
            committee: ''
        })

        setModalAdd(!modalAdd)
    }

    function createAwardLayout1() {
        checkLicense(user.sub)
            .then(result => {
                if (result === 0) {
                    alert("No valid Manuel License found! \nUpload a valid Manuel License to be able to configure data.")
                } else {
                    let awardData = awardsState

                    let i;
                    for (i = 0; i < data.committeeData.length; i++) {
                        if (JSON.stringify(awardData.committee) === JSON.stringify(data.committeeData[i].committee)) {
                            awardData["chair"] = data.committeeData[i].chair
                        }
                    }

                    customParticipationAwardLayout1(awardData, data.settings)
                }
            })

        setModalAdd(false)
    }

    async function getData() {
        await fetchData("/api/get/committee", user.sub).then((res) => {
            if (JSON.stringify(res) !== JSON.stringify(data.committeeData)) {
                setData(prevState => {
                    return { ...prevState, committeeData: res }
                })
            }
        })

        await fetchData("/api/get/registrationData", user.sub).then((res) => {
            if (JSON.stringify(res) !== JSON.stringify(data.registrationData)) {
                setData(prevState => {
                    return { ...prevState, registrationData: res }
                })
            }
        })

        await fetchData("/api/get/settings", user.sub).then((res) => {
            if (JSON.stringify(res[res.length - 1]) !== JSON.stringify(data.settings)) {
                setData(prevState => {
                    return { ...prevState, settings: res[res.length - 1] }
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
    }

    getData().then(() => {
        if (isLoading) {
            setIsLoading(false)
        }
    })

    return !isLoading ? (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Participation Awards by Committee
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="align-items-left">
                                <CCol lg="3">
                                    <CButton block color="primary" onClick={() => openModal()}>Custom Participation Award</CButton>
                                </CCol>
                            </CRow>
                            <br></br>
                            <CDataTable
                                items={data.committeeData}
                                fields={fieldsCommittee}
                                hover
                                striped
                                sorter
                                itemsPerPage={10}
                                pagination
                                scopedSlots={{
                                    'download':
                                        (item) => (
                                            <td>
                                                <CButton block color="primary" onClick={() => participationAwardsPDFLayout1(item, "Committee", data.settings)}>Download</CButton>
                                            </td>
                                        )
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Participation Awards by Delegation
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="align-items-left">
                                <CCol lg="3">
                                    <CButton block color="primary" onClick={() => openModal()}>Custom Participation Award</CButton>
                                </CCol>
                            </CRow>
                            <br></br>
                            <CDataTable
                                items={data.registrationData}
                                fields={fieldsDelegation}
                                hover
                                striped
                                sorter
                                itemsPerPage={10}
                                pagination
                                scopedSlots={{
                                    'download':
                                        (item) => (
                                            <td>
                                                <CButton block color="primary" onClick={() => participationAwardsPDFLayout1(item, "Delegation", data.settings)}>Download</CButton>
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
                    <CModalTitle>Create Custom Participation Award</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="award-committee">Committee</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CSelect custom name="awardCommittee" value={awardsState.committee} onChange={e => {
                                    const val = e.target.value
                                    setAwardsState(prevState => {
                                        return { ...prevState, committee: val }
                                    });
                                }}>
                                    {getCommittees(data.committeeData)}
                                </CSelect>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="award-pos">Position</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput name="awardPos" placeholder="Position" value={awardsState.position} onChange={e => {
                                    const val = e.target.value
                                    setAwardsState(prevState => {
                                        return { ...prevState, position: val }
                                    });
                                }} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="award-delegation">Delegation</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CSelect custom name="awardDelegation" value={awardsState.delegation} onChange={e => {
                                    const val = e.target.value
                                    setAwardsState(prevState => {
                                        return { ...prevState, delegation: val }
                                    });
                                }}>
                                    {getDelegations(data.registrationData)}
                                </CSelect>
                            </CCol>
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalAdd(false)}>Cancel</CButton>
                    <CButton color="primary" onClick={() => createAwardLayout1()}>Download</CButton>
                </CModalFooter>
            </CModal>
        </>
    ) : (<p>Waiting for Data...</p>)
}

export default ParticipationAwards