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

import { exportTable, getEmailList } from './registrationHelper'

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

const fields = [
  'window',
  'type',
  'division',
  'delegation',
  'contact',
  'email',
  'delegates',
  'actions'
]

let header = ""
let status = false;

const Registration = () => {
  const [modal, setModal] = useState(false)
  const [modalEmail, setModalEmail] = useState(false)

  const [registrationState, setRegistrationState] = useState({
    type: '',
    division: '',
    delegation: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    contact: '',
    email: '',
    phone: '',
    delegates: '',
    status: '',
    window: ''
  })

  function openModal() {
    setRegistrationState({
      type: '',
      division: '',
      delegation: '',
      street: '',
      city: '',
      state: '',
      zipcode: '',
      contact: '',
      email: '',
      phone: '',
      delegates: '',
      status: '',
      window: ''
    })

    header = "Add Registration Entry"
    status = false;

    setModal(!modal)
  }

  function addRegistration() {
    setModal(false)
  }

  function editRegistration(item) {
    setRegistrationState({
      type: item.type,
      division: item.division,
      delegation: item.delegation,
      street: item.street,
      city: item.city,
      state: item.state,
      zipcode: item.zipcode,
      contact: item.contact,
      email: item.email,
      phone: item.phone,
      delegates: item.delegates,
      status: item.status,
      window: item.window
    })

    header = "Edit " + item.delegation
    status = false;

    setModal(!modal)
  }

  function detailsRegistration(item) {
    setRegistrationState({
      type: item.type,
      division: item.division,
      delegation: item.delegation,
      street: item.street,
      city: item.city,
      state: item.state,
      zipcode: item.zipcode,
      contact: item.contact,
      email: item.email,
      phone: item.phone,
      delegates: item.delegates,
      status: item.status,
      window: item.window
    })

    header = item.delegation + " Details"
    status = true;

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
                  <CButton block color="primary" onClick={() => openModal()}>Add New</CButton>
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
                            <CDropdownItem onClick={() => detailsRegistration(item)}>Details</CDropdownItem>
                            <CDropdownItem onClick={() => editRegistration(item)}>Edit</CDropdownItem>
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
          <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="regi-time">Registration Time Window</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CSelect custom name="regiTime" disabled={status} value={registrationState.window} onChange={e => {
                  const val = e.target.value
                  setRegistrationState(prevState => {
                    return { ...prevState, window: val }
                  });
                }}>
                  <option value="" disabled>Select Registration Time Window</option>
                  <option value="Early">Early Registration</option>
                  <option value="Regular">Regular Registration</option>
                  <option value="Late">Late Registration</option>
                </CSelect>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="regi-type">Delegation Type</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CSelect custom name="regiTime" disabled={status} value={registrationState.type} onChange={e => {
                  const val = e.target.value
                  setRegistrationState(prevState => {
                    return { ...prevState, type: val }
                  });
                }}>
                  <option value="" disabled>Select Delegation Type</option>
                  <option value="Delegation">Delegation</option>
                  <option value="Independent">Independent</option>
                </CSelect>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="regi-division">Delegation Division</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox custom disabled={status} id="inline-checkbox1" name="middleSchool" checked={(registrationState.division.includes("Middle School"))} onChange={e => {
                    const middleSchool = e.target.checked
                    const highSchool = (registrationState.division.includes("High School"))
                    const university = (registrationState.division.includes("University"))

                    let val = ''

                    if (middleSchool) {
                      val = val + "Middle School, "
                    }

                    if (highSchool) {
                      val = val + "High School, "
                    }

                    if (university) {
                      val = val + "University, "
                    }

                    val = val.substring(0, val.length - 2)

                    setRegistrationState(prevState => {
                      return { ...prevState, division: val }
                    })
                  }} />
                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1">Middle School</CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox custom disabled={status} id="inline-checkbox2" name="highSchool" checked={(registrationState.division.includes("High School"))} onChange={e => {
                    const middleSchool = (registrationState.division.includes("Middle School"))
                    const highSchool = e.target.checked
                    const university = (registrationState.division.includes("University"))

                    let val = ''

                    if (middleSchool) {
                      val = val + "Middle School, "
                    }

                    if (highSchool) {
                      val = val + "High School, "
                    }

                    if (university) {
                      val = val + "University, "
                    }

                    val = val.substring(0, val.length - 2)

                    setRegistrationState(prevState => {
                      return { ...prevState, division: val }
                    })
                  }} />
                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox2">High School</CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox custom disabled={status} id="inline-checkbox3" name="middleSchool" checked={(registrationState.division.includes("University"))} onChange={e => {
                    const middleSchool = (registrationState.division.includes("Middle School"))
                    const highSchool = (registrationState.division.includes("High School"))
                    const university = e.target.checked

                    let val = ''

                    if (middleSchool) {
                      val = val + "Middle School, "
                    }

                    if (highSchool) {
                      val = val + "High School, "
                    }

                    if (university) {
                      val = val + "University, "
                    }

                    val = val.substring(0, val.length - 2)

                    setRegistrationState(prevState => {
                      return { ...prevState, division: val }
                    })
                  }} />
                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox3">University</CLabel>
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="regi-delegation-name">Delegation Name</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput disabled={status} name="regiDelegationName" placeholder="Delegation Name" value={registrationState.delegation} onChange={e => {
                  const val = e.target.value
                  setRegistrationState(prevState => {
                    return { ...prevState, delegation: val }
                  });
                }} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="regi-addr">Delegation Address</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput disabled={status} name="regiStreet" placeholder="Street" value={registrationState.street} onChange={e => {
                  const val = e.target.value
                  setRegistrationState(prevState => {
                    return { ...prevState, street: val }
                  });
                }} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3"></CCol>
              <CCol xs="12" md="3">
                <CInput disabled={status} name="regiCity" placeholder="City" value={registrationState.city} onChange={e => {
                  const val = e.target.value
                  setRegistrationState(prevState => {
                    return { ...prevState, city: val }
                  });
                }} />
              </CCol>
              <CCol xs="12" md="2">
                <CInput disabled={status} name="regiState" placeholder="State" value={registrationState.state} onChange={e => {
                  const val = e.target.value
                  setRegistrationState(prevState => {
                    return { ...prevState, state: val }
                  });
                }} />
              </CCol>
              <CCol xs="12" md="3">
                <CInput disabled={status} name="regiZip" placeholder="Zip Code" value={registrationState.zipcode} onChange={e => {
                  const val = e.target.value
                  setRegistrationState(prevState => {
                    return { ...prevState, zipcode: val }
                  });
                }} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="regi-contact-name">Contact Name</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput disabled={status} name="regiContact" placeholder="Contact Name" value={registrationState.contact} onChange={e => {
                  const val = e.target.value
                  setRegistrationState(prevState => {
                    return { ...prevState, contact: val }
                  });
                }} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="regi-email">Contact Email</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput disabled={status} name="regiEmail" placeholder="Contact Email" value={registrationState.email} onChange={e => {
                  const val = e.target.value
                  setRegistrationState(prevState => {
                    return { ...prevState, email: val }
                  });
                }} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="regi-phone">Contact Phone Number</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput disabled={status} name="regiPhone" placeholder="Phone Number" value={registrationState.phone} onChange={e => {
                  const val = e.target.value
                  setRegistrationState(prevState => {
                    return { ...prevState, phone: val }
                  });
                }} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="regi-delegates">Number of Delegates</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput disabled={status} type="number" name="regiDelegates" placeholder="Number of Delegates" value={registrationState.delegates} onChange={e => {
                  const val = e.target.value
                  setRegistrationState(prevState => {
                    return { ...prevState, delegates: val }
                  });
                }} />
              </CCol>
            </CFormGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModal(false)}>Cancel</CButton>
          <CButton color="primary" onClick={() => addRegistration()}>Submit</CButton>
        </CModalFooter>
      </CModal>

      <CModal show={modalEmail} onClose={() => setModalEmail} size="lg">
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