import React, { useState } from 'react'
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

import registrationData from '../../data/MockData/MockRegistration'
import committeeData from '../../data/MockData/MockCommittees'

import { getAwardTypes, getDelegations, getCommittees } from './awardHelper'

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
    const [modalAdd, setModalAdd] = useState(false)

    const [awardsState, setAwardsState] = useState({
        type: '',
        delegate: '',
        position: '',
        delegation: '',
        committee: ''
    })

    function openModal() {
        setAwardsState({
            type: '',
            delegate: '',
            position: '',
            delegation: '',
            committee: ''
        })

        setModalAdd(!modalAdd)
    }

    function createAwardLayout1() {
        customParticipationAwardLayout1(awardsState)

        setModalAdd(false)
    }

    return (
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
                                items={committeeData}
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
                                                <CButton block color="primary" onClick={() => participationAwardsPDFLayout1(item, "Committee")}>Download</CButton>
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
                                items={registrationData}
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
                                                <CButton block color="primary" onClick={() => participationAwardsPDFLayout1(item, "Delegation")}>Download</CButton>
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
                                <CLabel htmlFor="award-type">Award Type</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CSelect custom name="awardType" value={awardsState.type} onChange={e => {
                                    const val = e.target.value
                                    setAwardsState(prevState => {
                                        return { ...prevState, type: val }
                                    });
                                }}>
                                    {getAwardTypes()}
                                </CSelect>
                            </CCol>
                        </CFormGroup>
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
                                    {getCommittees()}
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
                                <CLabel htmlFor="award-del">Delegate Name</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput name="awardDel" placeholder="Delegate Name" value={awardsState.delegate} onChange={e => {
                                    const val = e.target.value
                                    setAwardsState(prevState => {
                                        return { ...prevState, delegate: val }
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
                                    {getDelegations()}
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
    )
}

export default ParticipationAwards