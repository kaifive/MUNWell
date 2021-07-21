import React from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow
} from '@coreui/react'
import { Export } from 'src/reusable'

import registrationData from '../../data/MockData/MockRegistration'
import committeeData from '../../data/MockData/MockCommittees'

import { exportTable, getFields, getScopedSlots } from './delegationAwardsHelper'

const fields = getFields()

const DelegationAwards = () => {
    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Delegation Awards
                            <Export data={exportTable()} filename="DelegationAwards.csv" />
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
        </>
    )
}

export default DelegationAwards