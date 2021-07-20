import React, { useState } from 'react'
import {
    CAlert,
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
    CRow
} from '@coreui/react'
import { Redirect } from 'react-router-dom'

import { Export } from 'src/reusable'
import { attendanceSheetPDF, placardSetPDF } from 'src/reusable/jsPDF'

import committeeData from '../../data/MockData/MockCommittees'
import registrationData from '../../data/MockData/MockRegistration'
import allotmentData from '../../data/MockData/MockAllotments'

const buttons = [{ void: 'void' }]

function getIndex(committee) {
    let i;
    for (i = 0; i < committeeData.length; i++) {
        if (committeeData[i].committee === committee) {
            return committeeData[i]
        }
    }

    return null
}

function getActive(item, committee) {
    let positions = getIndex(committee).positions.split(",")
    let assignments = getIndex(committee).assignments.split(",")

    let i;
    for (i = 0; i < positions.length; i++) {
        if (positions[i] === item.position && assignments[i] !== '') {
            return assignments[i];
        }
    }

    return "Select Delegation"
}

function getDelegations(item, committee) {
    let data = []

    let i;
    for (i = 0; i < registrationData.length; i++) {
        let name = registrationData[i].delegation

        if (name === getActive(item, committee)) {
            data[i] = <CDropdownItem active>{name}</CDropdownItem>
        } else {
            data[i] = <CDropdownItem>{name}</CDropdownItem>
        }
    }

    return data
}

function getData(committee) {
    let data = []
    let positions = committee.positions.split(",")

    let i;

    for (i = 0; i < positions.length; i++) {
        let temp = {}

        temp['position'] = positions[i]

        data[i] = temp
    }

    return data;
}

function exportTable(committee) {
    let positions = committee.positions.split(",")
    let assignments = committee.assignments.split(",")

    let data = []

    let i;
    for (i = 0; i < positions.length; i++) {
        let entry = {
            "position": positions[i],
            "assignment": assignments[i]
        }

        data.push(entry)
    }

    return data
}

function getAlerts(committee) {
    let alerts = []

    let i;
    for (i = 0; i < registrationData.length; i++) {
        let assignedPositions = 0;
        let j;
        for(j = 0; j < allotmentData.length; j++) {
            if(registrationData[i].delegation === allotmentData[j].delegation) {
                assignedPositions = allotmentData[j].allotments[committee.committee]
            }
        }

        let assignments = committee.assignments.split(",")
        let actualPositions = 0;
        let k;
        for(k = 0; k < assignments.length; k++) {
            if(assignments[k] === registrationData[i].delegation) {
                actualPositions = actualPositions + 1
            }
        }

        let alertNumber = assignedPositions - actualPositions

        let position = "position"
        if(alertNumber !== 1) {
            position = "positions"
        }

        let alert =
            <CRow>
                <CCol lg="12">
                    <CAlert color="danger">
                        <CRow>
                            <CCol lg="9">
                                {registrationData[i].delegation} requires <strong>{alertNumber}</strong> {position} in the {committee.committee}
                            </CCol>
                            <CCol lg="3">
                                <CButton block color="primary">Auto Assign</CButton>
                            </CCol>
                        </CRow>
                    </CAlert>
                </CCol>
            </CRow>

        if(alertNumber !== 0) {
            alerts.push(alert)
        }
    }

    return alerts
}

const fieldsAssignments = [
    'position',
    'assignment'
]

const fieldsButtons = [
    'placardSet',
    'attendanceSheet'
]

const Committee = ({ match: { params: { committee } } }) => {
    const [modalAdd, setModalAdd] = useState(false)

    let json = getIndex(committee)

    if (getIndex(committee) === null) {
        return <Redirect to={{ pathname: "/404" }} />
    }

    return (
        <>
            {getAlerts(json)}

            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            {committee} - Position Assigments
                            <Export data={exportTable(json)} filename={committee + " Position Assignments.csv"} />
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="align-items-left">
                                <CCol lg="3">
                                    <CButton block color="primary" onClick={() => setModalAdd(!modalAdd)}>Add New</CButton>
                                </CCol>
                            </CRow>
                            <br></br>
                            <CDataTable
                                items={getData(json)}
                                fields={fieldsAssignments}
                                hover
                                striped
                                sorter
                                itemsPerPage={10}
                                pagination
                                scopedSlots={{
                                    'assignment':
                                        (item) => (
                                            <td>
                                                <CDropdown className="m-1">
                                                    <CDropdownToggle color="secondary">
                                                        {getActive(item, committee)}
                                                    </CDropdownToggle>
                                                    <CDropdownMenu>
                                                        {getDelegations(item, committee)}
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

            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            {committee} - Generated Documents
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
                                                <CButton block color="primary" onClick={() => placardSetPDF(committee)}>Placard Set</CButton>
                                            </td>
                                        ),
                                    'attendanceSheet':
                                        (item) => (
                                            <td>
                                                <CButton block color="primary" onClick={() => attendanceSheetPDF(committee)}>Attendance Sheet</CButton>
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
                                <CInput id="new-position" name="new-position" placeholder="New Position" />
                            </CCol>
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalAdd(false)}>Cancel</CButton>
                    <CButton color="primary" onClick={() => setModalAdd(false)}>Submit</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default Committee