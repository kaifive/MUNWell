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
    CDropdownItem,
    CForm,
    CFormGroup,
    CInput,
    CInputCheckbox,
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CSelect,
    CTextarea
} from '@coreui/react'
import { Export } from 'src/reusable'

import committeeData from '../../data/MockData/MockCommittees'

function exportTable() {
    return committeeData
}

function count(string) {
    let count = 0
    let temp = string.split(",")

    let i
    for (i = 0; i < temp.length; i++) {
        if (temp[i] !== '') {
            count = count + 1
        }
    }

    return count
}

const fields = [
    'division',
    'category',
    'type',
    'committee',
    'abbreviation',
    'chair',
    {
        key: 'delegates',
        label: 'Assigned Positions',
    },
    {
        key: 'positionCount',
        label: 'Total Positions',
    },
    'actions'
]

const CommitteeRoster = () => {
    const [modalAdd, setModalAdd] = useState(false)

    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Committee Roster
                            <Export data={exportTable()} filename="CommitteeRoster.csv" />
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="align-items-left">
                                <CCol lg="3">
                                    <CButton block color="primary" onClick={() => setModalAdd(!modalAdd)}>Add New</CButton>
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
                                    'actions':
                                        (item) => (
                                            <td>
                                                <CDropdown className="m-1">
                                                    <CDropdownToggle color="secondary">
                                                        Select Action
                                                    </CDropdownToggle>
                                                    <CDropdownMenu>
                                                        <CDropdownItem>Edit</CDropdownItem>
                                                        <CDropdownItem>Delete</CDropdownItem>
                                                    </CDropdownMenu>
                                                </CDropdown>
                                            </td>
                                        ),
                                    'delegates':
                                        (item) => (
                                            <td>
                                                {count(item.assignments)}
                                            </td>
                                        ),
                                    'positionCount':
                                        (item) => (
                                            <td>
                                                {count(item.positions)}
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
                    <CModalTitle>Add Committee</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-category">Committee Category</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CSelect custom name="select" id="committee-category">
                                    <option selected value="default" disabled>Select Committee Category</option>
                                    <option value="ga">General Assembly</option>
                                    <option value="sa">Specialized Agency</option>
                                    <option value="cc">Crisis Committee</option>
                                    <option value="other">Other</option>
                                </CSelect>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-division">Committee Division</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CFormGroup variant="custom-checkbox" inline>
                                    <CInputCheckbox custom id="inline-checkbox1" name="inline-checkbox1" value="option1" />
                                    <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1">Middle School</CLabel>
                                </CFormGroup>
                                <CFormGroup variant="custom-checkbox" inline>
                                    <CInputCheckbox custom id="inline-checkbox2" name="inline-checkbox2" value="option2" />
                                    <CLabel variant="custom-checkbox" htmlFor="inline-checkbox2">High School</CLabel>
                                </CFormGroup>
                                <CFormGroup variant="custom-checkbox" inline>
                                    <CInputCheckbox custom id="inline-checkbox3" name="inline-checkbox3" value="option3" />
                                    <CLabel variant="custom-checkbox" htmlFor="inline-checkbox3">University</CLabel>
                                </CFormGroup>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-name">Committee Name</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput id="committee-name" name="committee-name" placeholder="Committee Name" />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-abbr">Committee Abbreviation</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput id="committee-abbr" name="committee-abbr" placeholder="Committee Abbreviation" />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-chair">Committee Chair</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput id="committee-chair" name="committee-chair" placeholder="Committee Chair" />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-positions">Committee Positions</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CTextarea name="committee-positions" id="committee-positions" rows="9" placeholder="Committee Positions" />
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

export default CommitteeRoster