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

import registrationData from '../../data/MockData/MockRegistration'
import committeeData from '../../data/MockData/MockCommittees'
import allotmentData from '../../data/MockData/MockAllotments'

let details = ["Category", "Division", "Name", "Abbreviation", "Chair", "Positions"]

const CommitteeAllotments = () => {
    const fields = getFields()
    const [modal, setModal] = useState(false)

    let category = [false, false, false, false]
    let division = [false, false, false]

    function openModal(committee) {
        let i;
        for(i = 0; i < committeeData.length; i++) {
            if(committeeData[i].committee === committee) {
                details[0] = committeeData[i].category
                details[1] = committeeData[i].division
                details[2] = committeeData[i].committee
                details[3] = committeeData[i].abbreviation
                details[4] = committeeData[i].name
                details[5] = committeeData[i].positions
            }
        }

        if (details[0] === "General Assembly") {
            category = [true, false, false, false]
        } else if (details[0] === "Specialized Agency") {
            category = [false, true, false, false]
        } else if (details[0] === "Crisis Committee") {
            category = [false, false, true, false]
        } else {
            category = [false, false, false, true]
        }

        if (details[1].includes("Middle School")) {
            division[0] = true;
        }

        if (details[1].includes("High School")) {
            division[1] = true;
        }

        if (details[2].includes("University")) {
            division[2] = true;
        }

        setModal(!modal)
    }

    function exportTable() {
        let data = []

        let i;
        for (i = 0; i < registrationData.length; i++) {
            let entry = {
                "delegation": registrationData[i]["delegation"]
            }

            let j;
            for (j = 0; j < committeeData.length; j++) {
                let name;
                if (committeeData[j].abbreviation === '') {
                    name = committeeData[j].committee
                } else {
                    name = committeeData[j].abbreviation
                }

                entry[name] = getAssigned(registrationData[i], committeeData[j].committee)
            }

            data.push(entry)
        }

        return data
    }

    function getFields() {
        let committeeList = []

        committeeList[0] = 'delegation'

        let i;
        for (i = 0; i < committeeData.length; i++) {
            let name;
            let committee = committeeData[i].committee
            let temp = committeeData[i].assignments.split(",")
            if (committeeData[i].abbreviation === '') {
                name = committeeData[i].committee
            } else {
                name = committeeData[i].abbreviation
            }

            let count = 0

            let j;
            for (j = 0; j < temp.length; j++) {
                if (temp[j] !== '') {
                    count = count + 1
                }
            }

            let item = {
                key: name,
                label: <CButton block variant="outline" color="primary" onClick={() => openModal(committee)}> {name + " | " + count} </CButton>
            }

            committeeList[i + 1] = item
        }

        committeeList[i + 1] = 'actions'
        return committeeList
    }

    function getAssigned(item, committee) {
        let i;
        for(i = 0; i < allotmentData.length; i++) {
            if(allotmentData[i].delegation === item.delegation) {
                return allotmentData[i].allotments[committee]
            }
        }

        return 0
    }

    function getScopedSlots(committeeData) {
        let scopedSlots = {}

        let i;
        for (i = 0; i < committeeData.length; i++) {
            let temp;
            let committee;

            if (committeeData[i].abbreviation === '') {
                temp = committeeData[i].committee
                committee = committeeData[i].committee

                scopedSlots[temp] =
                    (item) => (
                        <td>
                            {getAssigned(item, committee)}
                        </td>
                    )

            } else {
                temp = committeeData[i].abbreviation
                committee = committeeData[i].committee

                scopedSlots[temp] =
                    (item) => (
                        <td>
                            {getAssigned(item, committee)}
                        </td>
                    )
            }
        }

        scopedSlots['actions'] =
            (item) => (
                <td>
                    <CDropdown className="m-1">
                        <CDropdownToggle color="secondary">
                            Select Action
                        </CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem>Edit</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </td>
            )

        return scopedSlots
    }

    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Committee Allotments
                            <Export data={exportTable()} filename="CommitteeAllotments.csv" />
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

            <CModal show={modal} onClose={setModal} size="lg">
                <CModalHeader>
                    <CModalTitle>{details[2]}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-category">Committee Category</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CSelect disabled custom name="select" id="committee-category">
                                    <option defaultValue={category[0]} value="ga">General Assembly</option>
                                    <option defaultValue={category[1]} value="sa">Specialized Agency</option>
                                    <option defaultValue={category[2]} value="cc">Crisis Committee</option>
                                    <option defaultValue={category[3]} value="other">Other</option>
                                </CSelect>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-division">Committee Division</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CFormGroup variant="custom-checkbox" inline>
                                    <CInputCheckbox disabled custom id="inline-checkbox1" name="inline-checkbox1" value="option1" onClick={!division[0]} checked={division[0]}/>
                                    <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1">Middle School</CLabel>
                                </CFormGroup>
                                <CFormGroup variant="custom-checkbox" inline>
                                    <CInputCheckbox disabled custom id="inline-checkbox2" name="inline-checkbox2" value="option2" onClick={!division[0]} checked={division[1]}/>
                                    <CLabel variant="custom-checkbox" htmlFor="inline-checkbox2">High School</CLabel>
                                </CFormGroup>
                                <CFormGroup variant="custom-checkbox" inline>
                                    <CInputCheckbox disabled custom id="inline-checkbox3" name="inline-checkbox3" value="option3" onClick={!division[0]} checked={division[2]}/>
                                    <CLabel variant="custom-checkbox" htmlFor="inline-checkbox3">University</CLabel>
                                </CFormGroup>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-name">Committee Name</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput disabled id="committee-name" name="committee-name" placeholder="Committee Name" value={details[2]} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-abbr">Committee Abbreviation</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput disabled id="committee-abbr" name="committee-abbr" placeholder="Committee Abbreviation" value={details[3]}/>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-chair">Committee Chair</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput disabled id="committee-chair" name="committee-chair" placeholder="Committee Chair" value={details[4]}/>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-positions">Committee Positions</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CTextarea disabled name="committee-positions" id="committee-positions" rows="9" placeholder="Committee Positions" value={details[5]}/>
                            </CCol>
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => setModal(false)}>Close</CButton>
                </CModalFooter>
            </CModal>

        </>
    )
}

export default CommitteeAllotments