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
import { committeeAwardsPDFLayout1 } from 'src/reusable/jsPDF'

import committeeData from '../../data/MockData/MockCommittees'

const fields = [
    'division',
    'category',
    'committee',
    'abbreviation',
    'download'
]

const CommitteeAwards = () => {
    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Committee Awards
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="align-items-left">
                                <CCol lg="3">
                                    <CButton block color="primary">Custom Committee Award</CButton>
                                </CCol>
                            </CRow>
                            <br></br>
                            <CDataTable
                                items={committeeData}
                                fields={fields}
                                hover
                                striped
                                sorter
                                itemsPerPage={10}
                                pagination
                                scopedSlots={{
                                    'download':
                                        (item) => (
                                            <td>
                                                <CButton block color="primary" onClick={() => committeeAwardsPDFLayout1(item)}>Download</CButton>
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

export default CommitteeAwards