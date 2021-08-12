import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardFooter,
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
import { Redirect } from 'react-router-dom'
import { Export } from 'src/reusable'
import { attendanceSheetPDF, placardSetPDF } from 'src/reusable/jsPDF'

import fetchData from '../../data/LiveData/FetchData'

import { getAllDelegations, getCommitteeData, exportTable, getAlerts } from './committeeHelper'

const buttons = [{ void: 'void' }]

const fieldsAssignments = [
    'position',
    'assignment'
]

const fieldsButtons = [
    'placardSet',
    'attendanceSheet'
]

const Committee = ({ match: { params: { committee } } }) => {
    const { user } = useAuth0()

    const [modalAdd, setModalAdd] = useState(false)

    const [positionState, setPositionState] = useState({
        position: ''
    })

    const [data, setData] = useState({
        registrationData: [],
        settings: [],
        committee: [],
        redirect: false
    })

    async function getData() {
        await fetchData('/api/get/registrationData', user.sub).then((res) => {
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
            }
        })
    }

    function openModal() {
        setPositionState({
            position: ''
        })

        setModalAdd(!modalAdd)
    }

    function addPosition() {
        setModalAdd(false)
    }

    getData()

    return data.committee.length !== 0 ? (
        <>
            {getAlerts(data.committee)}

            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            {data.committee.committee} - Position Assigments
                            <Export data={exportTable(data.committee)} filename={data.committee.committee + " Position Assignments.csv"} />
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="align-items-left">
                                <CCol lg="3">
                                    <CButton block color="primary" onClick={() => openModal()}>Add New</CButton>
                                </CCol>
                            </CRow>
                            <br></br>
                            <CDataTable
                                items={getCommitteeData(data.committee)}
                                fields={fieldsAssignments}
                                hover
                                striped
                                sorter
                                scopedSlots={{
                                    'assignment':
                                        (item) => (
                                            <td>
                                                <CSelect custom name="select" id="award-delegation" >
                                                    {getAllDelegations(data.committee, data.registrationData)}
                                                </CSelect>
                                            </td>
                                        )
                                }}
                            />
                        </CCardBody>
                        <CCardFooter>
                            <CRow className="align-items-right">
                                <CCol lg="2">
                                    <CButton block color="primary">Save Changes</CButton>
                                </CCol>
                            </CRow>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>

            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            {data.committee.committee} - Generated Documents
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={buttons}
                                fields={fieldsButtons}
                                hover
                                striped
                                sorter
                                itemsPerPage={10}
                                pagination
                                scopedSlots={{
                                    'placardSet':
                                        (item) => (
                                            <td>
                                                <CButton block color="primary" onClick={() => placardSetPDF(data.committee, data.settings)}>Placard Set</CButton>
                                            </td>
                                        ),
                                    'attendanceSheet':
                                        (item) => (
                                            <td>
                                                <CButton block color="primary" onClick={() => attendanceSheetPDF(data.committee)}>Attendance Sheet</CButton>
                                            </td>
                                        ),
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CModal show={modalAdd} onClose={setModalAdd} size="lg">
                <CModalHeader>
                    <CModalTitle>Add Position</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="new-position">New Position</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput name="newPosition" placeholder='New Position - Separate multiple positions with a comma (",")' value={positionState.position} onChange={e => {
                                    const val = e.target.value
                                    setPositionState(prevState => {
                                        return { ...prevState, position: val }
                                    });
                                }} />
                            </CCol>
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalAdd(false)}>Cancel</CButton>
                    <CButton color="primary" onClick={() => addPosition()}>Submit</CButton>
                </CModalFooter>
            </CModal>
        </>
    ) : ((data.redirect) ? <Redirect to={{ pathname: "/404" }} /> : <p>Waiting for Data...</p>)
}

export default Committee