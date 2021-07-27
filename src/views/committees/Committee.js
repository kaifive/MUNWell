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

import { getIndex, getActive, getDelegations, getData, exportTable, getAlerts } from './committeeHelper'

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
    const [modalAdd, setModalAdd] = useState(false)

    const [positionState, setPositionState] = useState({
        position: ''
    })

    function openModal() {
        setPositionState({
            position: ''
        })

        setModalAdd(!modalAdd)
    }

    function addPosition() {
        setModalAdd(false)
    }

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
                                    <CButton block color="primary" onClick={() => openModal()}>Add New</CButton>
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
                                                        {getDelegations(item, json)}
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
                                <CInput name="newPosition" placeholder="New Position" value={positionState.position} onChange={e => {
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
    )
}

export default Committee