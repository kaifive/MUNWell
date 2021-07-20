import React from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow
} from '@coreui/react'

import registrationData from '../../data/MockData/MockRegistration'
import committeeData from '../../data/MockData/MockCommittees'
import { participationAwardsPDFLayout1 } from 'src/reusable/jsPDF'

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
                                    <CButton block color="primary">Custom Participation Award</CButton>
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
                                <CButton block color="primary">Custom Participation Award</CButton>
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
        </>
    )
}

export default ParticipationAwards