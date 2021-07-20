import React, { useState } from 'react'
import {
  CBadge,
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
  CSelect
} from '@coreui/react'
import { Export } from 'src/reusable'

import registrationData from '../../data/MockData/MockRegistration'

const getBadge = label => {
  switch (label) {
    case 'Paid': return 'success'
    case 'Pending': return 'warning'

    case 'Early': return 'success'
    case 'Regular': return 'warning'
    case 'Late': return 'danger'
    default: return 'primary'
  }
}

function exportTable() {
  let data = registrationData

  return data
}

function getEmailList(registrationData) {
  let emailList = ""
  let i;
  for (i = 0; i < registrationData.length; i++) {
    emailList = emailList + registrationData[i].email + ",\n"
  }

  emailList = emailList.substring(0, emailList.length - 2)

  return emailList
}

const fields = [
  {
    key: 'window',
    label: 'Registration Window'
  },
  'type',
  'division',
  'delegation',
  'contact',
  'email',
  'delegates',
  'actions'
]

let details = ['window', 'type', 'division', 'delegation', "street", "city", "state", "zip", 'contact', 'email', 'phone', 'delegates']
let status;
let header;
let registrationWindow = [true, false, false, false]
let dropdown = [true, false, false]
let checkboxes = [false, false, false]

const Registration = () => {
  const [modal, setModal] = useState(false)
  const [modalEmail, setModalEmail] = useState(false)

  function openModal(item, modalType) {
    if (modalType === "Add") {
      details = ['Delegation Window', 'Delegation Type', 'Delegation Division', 'Delegation Name', "Street", "City", "State", "Zip Code", 'Contact Name', 'Contact Email', 'Contact Phone Number', 'Number of Delegates']

      status = false;
      registrationWindow = [true, false, false, false]
      dropdown = [true, false, false]
      checkboxes = [false, false, false]
      header = "Add Registration Entry"
    } else {
      details[0] = item.window
      details[1] = item.type
      details[2] = item.division
      details[3] = item.delegation
      details[4] = item.street
      details[5] = item.city
      details[6] = item.state
      details[7] = item.zipcode
      details[8] = item.contact
      details[9] = item.email
      details[10] = item.phone
      details[11] = item.delegates

      if (details[0] === "Early") {
        registrationWindow = [false, true, false, false]
      } else if (details[0] === "Regular") {
        registrationWindow = [false, false, true, false]
      } else if (details[0] === "Late") {
        registrationWindow = [false, false, false, true]
      }

      if (details[1] === "Delegation") {
        dropdown = [false, true, false]
      } else {
        dropdown = [false, false, true]
      }

      checkboxes = [false, false, false]

      if (details[2].includes("Middle School")) {
        checkboxes[0] = true
      }

      if (details[2].includes("High School")) {
        checkboxes[1] = true
      }

      if (details[2].includes("University")) {
        checkboxes[2] = true
      }

      if (modalType === "Details") {
        status = true;
        header = details[3] + " - Registration Data Details"
      } else if (modalType === "Edit") {
        status = false;
        header = details[3] + " - Edit Registration Data"
      }
    }

    setModal(!modal)
  }

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Registration Data
              <Export data={exportTable()} filename="RegistrationData.csv" />
            </CCardHeader>
            <CCardBody>
              <CRow className="align-items-left">
                <CCol lg="3">
                  <CButton block color="primary" onClick={() => openModal("", "Add")}>Add New</CButton>
                </CCol>
                <CCol lg="3">
                  <CButton block color="secondary" onClick={() => setModalEmail(!modalEmail)}>Email List</CButton>
                </CCol>
              </CRow>
              <br></br>
              <CDataTable
                items={registrationData}
                fields={fields}
                hover
                striped
                sorter
                itemsPerPage={10}
                pagination
                scopedSlots={{
                  'window':
                    (item) => (
                      <td>
                        <CBadge color={getBadge(item.window)}>
                          {item.window}
                        </CBadge>
                      </td>
                    ),
                  'actions':
                    (item) => (
                      <td>
                        <CDropdown className="m-1">
                          <CDropdownToggle color="secondary">
                            Select Action
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem onClick={() => openModal(item, "Details")}>Details</CDropdownItem>
                            <CDropdownItem onClick={() => openModal(item, "Edit")}>Edit</CDropdownItem>
                            <CDropdownItem>Delete</CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </td>
                    ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CModal show={modal} onClose={setModal} size="lg">
        <CModalHeader>
          <CModalTitle>{header}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="form-horizontal">
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="regi-time">Registration Time Window</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CSelect disabled={status} custom name="select" id="regi-time">
                  <option selected={registrationWindow[0]} hidden value="default">Select Registration Time Window</option>
                  <option selected={registrationWindow[1]} value="Early">Early Registration</option>
                  <option selected={registrationWindow[2]} value="Regular">Regular Registration</option>
                  <option selected={registrationWindow[3]} value="Late">Late Registration</option>
                </CSelect>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="regi-type">Delegation Type</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CSelect disabled={status} custom name="select" id="regi-type">
                  <option selected={dropdown[0]} hidden value="default">Select Delgation Type</option>
                  <option selected={dropdown[1]} value="Delegation">Delegation</option>
                  <option selected={dropdown[2]} value="Independent">Independent</option>
                </CSelect>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="regi-division">Delegation Division</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox disabled={status} custom id="inline-checkbox1" name="inline-checkbox1" value="option1" onClick={!checkboxes[0]} checked={checkboxes[0]} />
                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1">Middle School</CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox disabled={status} custom id="inline-checkbox2" name="inline-checkbox2" value="option2" onClick={!checkboxes[1]} checked={checkboxes[1]} />
                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox2">High School</CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox disabled={status} custom id="inline-checkbox3" name="inline-checkbox3" value="option3" onClick={!checkboxes[2]} checked={checkboxes[2]} />
                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox3">University</CLabel>
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="regi-delegation-name">Delegation Name</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput disabled={status} id="regi-delegation-name" name="regi-delegation-name" placeholder={details[3]} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="regi-addr">Delegation Address</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput disabled={status} id="regi-street" name="regi-street" placeholder={details[4]} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3"></CCol>
              <CCol xs="12" md="3">
                <CInput disabled={status} id="regi-city" name="regi-city" placeholder={details[5]} />
              </CCol>
              <CCol xs="12" md="2">
                <CInput disabled={status} id="regi-state" name="regi-state" placeholder={details[6]} />
              </CCol>
              <CCol xs="12" md="3">
                <CInput disabled={status} id="regi-postal" name="regi-postal" placeholder={details[7]} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="regi-contact-name">Contact Name</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput disabled={status} id="regi-contact-name" name="regi-contact-name" placeholder={details[8]} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="regi-email">Contact Email</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput disabled={status} id="regi-email" name="regi-email" placeholder={details[9]} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="regi-phone">Contact Phone Number</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput disabled={status} id="regi-phone" name="regi-phone" placeholder={details[10]} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="regi-delegates">Number of Delegates</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput disabled={status} type="number" id="regi-delegates" name="regi-delegates" placeholder={details[11]} />
              </CCol>
            </CFormGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModal(false)}>Close</CButton>
          <CButton color="primary" onClick={() => setModal(false)}>Save</CButton>
        </CModalFooter>
      </CModal>

      <CModal show={modalEmail} onClose={setModalEmail} size="lg">
        <CModalHeader>
          <CModalTitle>Full Registration Email List</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {getEmailList(registrationData)}
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalEmail(false)}>Close</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Registration