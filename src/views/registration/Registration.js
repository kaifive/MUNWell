import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
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

import fetchData from '../../data/LiveData/FetchData'

import { exportTable, getEmailList } from './registrationHelper'
import { getStateList } from 'src/reusable/StateList';
import { checkLicense } from 'src/reusable/checkLicense';


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
let editItem;

const Registration = () => {
  const { user } = useAuth0()
  const { isAuthenticated } = useAuth0()

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

  const [data, setData] = useState({
    registrationData: ["", ""],
    committeeData: ["", ""]
  });

  const [isLoading, setIsLoading] = useState(true)

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

  function addRegistration(event) {
    event.preventDefault();

    checkLicense(user.sub)
      .then(result => {
        if (result === 0) {
          alert("No valid Manuel License found! \nUpload a valid Manuel License to be able to configure data.")
        } else {
          const payload = {
            user: user.sub,
            type: registrationState.type,
            division: registrationState.division,
            delegation: registrationState.delegation,
            street: registrationState.street,
            city: registrationState.city,
            state: registrationState.state,
            zipcode: registrationState.zipcode,
            contact: registrationState.contact,
            email: registrationState.email,
            phone: registrationState.phone,
            delegates: registrationState.delegates,
            status: (registrationState.status) ? registrationState.status : "Pending",
            window: registrationState.window
          }

          let allotment = ""
          let i;
          for (i = 0; i < data.committeeData.length; i++) {
            allotment = allotment + data.committeeData[i].committee + ":" + 0 + ","
          }

          if (!header.includes("Edit")) {
            axios({
              url: '/api/save/registrationData',
              method: 'POST',
              data: payload
            })
              .then(() => {
                const allotments = {
                  user: user.sub,
                  delegation: registrationState.delegation,
                  delegationId: '',
                  allotments: allotment.substring(0, allotment.length - 1)
                }

                fetchData("/api/get/registrationData", user.sub, 'delegates').then((res) => {
                  let j;
                  for (j = 0; j < res.length; j++) {
                    if (res[j].delegation === payload.delegation) {
                      allotments.delegationId = res[j]._id
                    }
                  }
                })
                  .then(() => {
                    axios({
                      url: '/api/save/allotments',
                      method: 'POST',
                      data: allotments
                    })
                      .then(() => {
                        alert(registrationState.delegation + " added successfully!")
                      })
                  })
              })
              .catch(() => {
                console.log('Internal server error')
              })
          } else {
            axios.put('/api/update/registrationData', {
              data: {
                id: editItem._id,
                update: payload
              },
            })
              .then(() => {
                const allotments = {
                  user: user.sub,
                  delegation: registrationState.delegation,
                  delegationId: editItem._id,
                  allotments: ''
                }

                fetchData("/api/get/allotments", user.sub, 'delegation').then((res) => {
                  let j;
                  for (j = 0; j < res.length; j++) {
                    if (res[j].delegationId === allotments.delegationId) {
                      allotments.allotments = res[j].allotments

                      axios.put('/api/update/allotments', {
                        data: {
                          id: res[j]._id,
                          update: allotments
                        },
                      }).then(() => {
                        alert(registrationState.delegation + " updated successfully!")
                      })
                    }
                  }
                })
              })
              .catch(() => {
                console.log('Internal server error')
              })
          }
        }
      })

    fetchData("/api/get/registrationData", user.sub, 'delegates').then((res) => {
      setData(prevState => {
        return { ...prevState, registrationData: JSON.stringify(res) }
      })
    })

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
    editItem = item

    setModal(!modal)
  }

  function deleteRegistration(item) {
    checkLicense(user.sub)
      .then(result => {
        if (result === 0) {
          alert("No valid Manuel License found! \nUpload a valid Manuel License to be able to configure data.")
        } else {
          axios.delete('/api/delete/registrationData', {
            data: {
              id: item._id,
            },
          })
            .then(() => {
              fetchData("/api/get/allotments", user.sub, 'delegation').then((res) => {
                let j;
                for (j = 0; j < res.length; j++) {
                  if (res[j].delegationId === item._id) {
                    axios.delete('/api/delete/allotments', {
                      data: {
                        id: res[j]._id,
                      },
                    })
                      .then(() => {
                        alert(item.delegation + " deleted successfully!")
                      })
                  }
                }
              })
            })
            .catch(() => {
              console.log('Internal server error')
            })
        }
      })

    fetchData("/api/get/registrationData", user.sub, 'delegates').then((res) => {
      if (JSON.stringify(res) !== JSON.stringify(data.registrationData)) {
        setData(prevState => {
          return { ...prevState, registrationData: JSON.stringify(res) }
        })
      }
    })
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

  async function getData() {
    await fetchData("/api/get/registrationData", user.sub, 'delegates').then((res) => {
      if (JSON.stringify(res) !== JSON.stringify(data.registrationData)) {
        let string = JSON.stringify(res)

        setData(prevState => {
          return { ...prevState, registrationData: string }
        })
      }
    })

    await fetchData("/api/get/committee", user.sub, 'division').then((res) => {
      if (JSON.stringify(res) !== JSON.stringify(data.committeeData)) {
        setData(prevState => {
          return { ...prevState, committeeData: res }
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

  return !isLoading ? (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Registration Data
              <Export data={exportTable(JSON.parse(data.registrationData))} filename="RegistrationData.csv" />
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
                items={JSON.parse(data.registrationData)}
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
                            <CDropdownItem onClick={() => deleteRegistration(item)}>Delete</CDropdownItem>
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
                  <option value="" disabled hidden>Select Registration Time Window</option>
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
                  <option value="" disabled hidden>Select Delegation Type</option>
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
                <CSelect disabled={status} custom name="regiState" value={registrationState.state} onChange={e => {
                  const val = e.target.value
                  setRegistrationState(prevState => {
                    return { ...prevState, state: val }
                  });
                }}>
                  {getStateList()}
                </CSelect>
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
                <CInput disabled={status} type="number" min="0" name="regiDelegates" placeholder="Number of Delegates" value={registrationState.delegates} onChange={e => {
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
          <CButton color="secondary" onClick={() => setModal(false)} hidden={status}>Cancel</CButton>
          <CButton color="primary" onClick={event => addRegistration(event)} hidden={status}>Submit</CButton>
          <CButton color="primary" onClick={() => setModal(false)} hidden={!status}>Close</CButton>
        </CModalFooter>
      </CModal>

      <CModal show={modalEmail} onClose={() => setModalEmail} size="lg">
        <CModalHeader>
          <CModalTitle>Full Registration Email List</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {getEmailList(JSON.parse(data.registrationData))}
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalEmail(false)}>Close</CButton>
        </CModalFooter>
      </CModal>
    </>
  ) : (<p>Waiting for Data...</p>)
}

export default Registration