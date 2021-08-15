import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow
} from '@coreui/react'
import { Export } from 'src/reusable'

import { getFields, exportTable, getScopedSlots } from './delegationAwardsHelper';

import fetchData from '../../data/LiveData/FetchData'

let fields;

const DelegationAwards = () => {
    const { user } = useAuth0()
    const { isAuthenticated } = useAuth0()

    const [data, setData] = useState({
        registrationData: [],
        awardData: [],
        awardType: [],
        committeeData: []
    });

    const [isLoading, setIsLoading] = useState(true)

    async function getData() {
        fetchData('/api/get/awardType', user.sub).then((res) => {
            if (JSON.stringify(res) !== JSON.stringify(data.awardType)) {
                setData(prevState => {
                    return { ...prevState, awardType: res }
                })
            }
        })

        fetchData('/api/get/committee', user.sub).then((res) => {
            if (JSON.stringify(res) !== JSON.stringify(data.committeeData)) {
                setData(prevState => {
                    return { ...prevState, committeeData: res }
                })
            }
        })

        fetchData('/api/get/individualAward', user.sub).then((res) => {
            if (JSON.stringify(res) !== JSON.stringify(data.awardData)) {
                setData(prevState => {
                    return { ...prevState, awardData: res }
                })
            }
        })

        fetchData('/api/get/registrationData', user.sub, 'division').then((res) => {
            if (JSON.stringify(res) !== JSON.stringify(data.registrationData)) {
                setData(prevState => {
                    return { ...prevState, registrationData: res }
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

    fields = getFields(data.awardType)

    return !isLoading ? (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Delegation Awards
                            <Export data={exportTable(data.registrationData, data.awardData, data.awardType, data.committeeData)} filename="DelegationAwards.csv" />
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
                                    getScopedSlots(data.awardType, data.awardData, data.committeeData)
                                }
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    ) : (<p>Waiting for Data...</p>)
}

export default DelegationAwards