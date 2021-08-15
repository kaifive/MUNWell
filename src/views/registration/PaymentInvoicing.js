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

import fetchData from '../../data/LiveData/FetchData'

import { invoicePDF, receiptPDF } from 'src/reusable/jsPDF'
import { exportTable, getDelegations } from './paymentInvoicingHelper'
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
  'status',
  'window',
  'type',
  'delegation',
  'contact',
  'email',
  'delegates',
  'delegateFee',
  'invoiceTotal',
  'actions'
]

const PaymentInvoicing = () => {
  const { user } = useAuth0()
  const { isAuthenticated } = useAuth0()

  const [modalInvoice, setModalInvoice] = useState(false)
  const [modalReceipt, setModalReceipt] = useState(false)

  const [invoiceState, setInvoiceState] = useState({
    delegation: '',
    line1: { qty: '', description: '', price: '', amount: '' },
    line2: { qty: '', description: '', price: '', amount: '' },
    line3: { qty: '', description: '', price: '', amount: '' },
    line4: { qty: '', description: '', price: '', amount: '' },
    line5: { qty: '', description: '', price: '', amount: '' },
    note: ''
  })

  const [receiptState, setReceiptState] = useState({
    delegation: '',
    total: '',
    description: '',
    note: ''
  })

  const [data, setData] = useState({
    registrationData: [],
    settings: []
  });

  const [isLoading, setIsLoading] = useState(true)

  function getDelegateFee(item) {
    let multiplier = 0;

    if (item.window === "Early") {
      multiplier = Number(data.settings.earlydelfee)
    } else if (item.window === "Regular") {
      multiplier = Number(data.settings.regdelfee)
    } else if (item.window === "Late") {
      multiplier = Number(data.settings.latedelfee)
    }

    let amount = 0
    amount = item.delegates * multiplier
    amount = amount.toFixed(2)
    return amount
  }

  function getInvoiceTotal(item) {
    let amount = 0;
    amount = + getDelegateFee(item)

    let schoolfee = 0;

    if (item.window === "Early") {
      schoolfee = Number(data.settings.earlyschoolfee)
    } else if (item.window === "Regular") {
      schoolfee = Number(data.settings.regschoolfee)
    } else if (item.window === "Late") {
      schoolfee = Number(data.settings.lateschoolfee)
    }

    if (item.type === 'Delegation') {
      amount = amount + schoolfee
    }

    amount = amount.toFixed(2)
    return amount
  }

  function openInvoiceModal() {
    setInvoiceState({
      delegation: '',
      line1: { qty: '', description: '', price: '' },
      line2: { qty: '', description: '', price: '' },
      line3: { qty: '', description: '', price: '' },
      line4: { qty: '', description: '', price: '' },
      line5: { qty: '', description: '', price: '' },
      note: ''
    })

    setModalInvoice(!modalInvoice)
  }

  function generateInvoice() {
    checkLicense(user.sub)
      .then(result => {
        if (result === 0) {
          alert("No valid Manuel License found! \nUpload a valid Manuel License to be able to configure data.")
        } else {
          let item = invoiceState

          let i;
          for (i = 0; i < data.registrationData.length; i++) {
            if (data.registrationData[i].delegation === item.delegation) {
              item["contact"] = data.registrationData[i].contact
              item["street"] = data.registrationData[i].street
              item["city"] = data.registrationData[i].city
              item["state"] = data.registrationData[i].state
              item["zipcode"] = data.registrationData[i].zipcode
            }
          }

          let amounts = [item.line1.qty * item.line1.price,
          item.line2.qty * item.line2.price,
          item.line3.qty * item.line3.price,
          item.line4.qty * item.line4.price,
          item.line5.qty * item.line5.price]

          let total = 0

          let j;
          for (j = 0; j < amounts.length; j++) {
            if (amounts[j] !== 0) {
              total = + total + Number(amounts[j])
            }
          }

          item["total"] = total

          invoicePDF(item, data.settings)
        }
      })

    setModalInvoice(false)
  }

  function openReceiptModal() {
    setReceiptState({
      delegation: '',
      total: '',
      description: '',
      note: ''
    })

    setModalReceipt(!modalReceipt)
  }

  function generateReceipt() {
    checkLicense(user.sub)
      .then(result => {
        if (result === 0) {
          alert("No valid Manuel License found! \nUpload a valid Manuel License to be able to configure data.")
        } else {
          let item = receiptState

          let i;
          for (i = 0; i < data.registrationData.length; i++) {
            if (data.registrationData[i].delegation === item.delegation) {
              item["contact"] = data.registrationData[i].contact
              item["street"] = data.registrationData[i].street
              item["city"] = data.registrationData[i].city
              item["state"] = data.registrationData[i].state
              item["zipcode"] = data.registrationData[i].zipcode
            }
          }

          receiptPDF(item, data.settings)
        }
      })

    setModalReceipt(false)
  }

  function reverseStatus(item) {
    let newStatus = ""

    if (item.status === "Pending") {
      newStatus = "Paid"
    } else {
      newStatus = "Pending"
    }

    axios.put('/api/update/registrationData', {
      data: {
        id: item._id,
        update: { status: newStatus }
      },
    });

    fetchData("/api/get/registrationData", user.sub, 'delegates').then((res) => {
      setData(prevState => {
        return { ...prevState, registrationData: JSON.stringify(res) }
      })
    })
  }

  async function getData() {
    await fetchData("/api/get/registrationData", user.sub, 'delegates').then((res) => {
      if (JSON.stringify(res) !== JSON.stringify(data.registrationData)) {
        setData(prevState => {
          return { ...prevState, registrationData: JSON.stringify(res) }
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
              Payment Invoicing Data
              <Export data={exportTable(JSON.parse(data.registrationData))} filename="PaymentInvoicing.csv" />
            </CCardHeader>
            <CCardBody>
              <CRow className="align-items-left">
                <CCol lg="3">
                  <CButton block color="primary" onClick={() => openInvoiceModal()}>Custom Payment Invoice</CButton>
                </CCol>
                <CCol lg="3">
                  <CButton block color="primary" onClick={() => openReceiptModal()}>Custom Payment Receipt</CButton>
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
                  'status':
                    (item) => (
                      <td>
                        <CBadge color={getBadge(item.status)}>
                          {item.status}
                        </CBadge>
                      </td>
                    ),
                  'window':
                    (item) => (
                      <td>
                        <CBadge color={getBadge(item.window)}>
                          {item.window}
                        </CBadge>
                      </td>
                    ),
                  'delegateFee':
                    (item) => (
                      <td>
                        ${getDelegateFee(item)}
                      </td>
                    ),
                  'invoiceTotal':
                    (item) => (
                      <td>
                        ${getInvoiceTotal(item)}
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
                            <CDropdownItem onClick={() => reverseStatus(item)}>Reverse Status</CDropdownItem>
                            <CDropdownItem onClick={() => invoicePDF(item, data.settings)}>Download Payment Invoice</CDropdownItem>
                            <CDropdownItem onClick={() => receiptPDF(item, data.settings)}>Download Payment Receipt</CDropdownItem>
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

      <CModal show={modalInvoice} onClose={setModalInvoice} size="lg">
        <CModalHeader>
          <CModalTitle>Custom Payment Invoice</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="invoice-delegation">Invoice Delegation</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CSelect custom name="invoiceDelegation" value={invoiceState.delegation} onChange={e => {
                  const val = e.target.value
                  setInvoiceState(prevState => {
                    return { ...prevState, delegation: val }
                  });
                }}>
                  {getDelegations(data.registrationData)}
                </CSelect>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol xs="12" md="12">
                <strong>Invoice Table</strong>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol xs="12" md="2">
                QTY
              </CCol>
              <CCol xs="12" md="4">
                Description
              </CCol>
              <CCol xs="12" md="3">
                Unit Price ($)
              </CCol>
              <CCol xs="12" md="3">
                Amount ($)
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol xs="12" md="2">
                <CInput type="number" name="line1QTY" placeholder="QTY" value={invoiceState.line1.qty} onChange={e => {
                  let line1 = invoiceState.line1
                  const val = e.target.value
                  setInvoiceState(prevState => {
                    return { ...prevState, line1: { qty: val, description: line1.description, price: line1.price, amount: line1.amount } }
                  });
                }} />
              </CCol>
              <CCol xs="12" md="4">
                <CTextarea type="text" rows="1" name="line1Description" placeholder="Description" value={invoiceState.line1.description} onChange={e => {
                  let line1 = invoiceState.line1
                  const val = e.target.value
                  setInvoiceState(prevState => {
                    return { ...prevState, line1: { qty: line1.qty, description: val, price: line1.price, amount: line1.amount } }
                  });
                }} />
              </CCol>
              <CCol xs="12" md="3">
                <CInput type="number" name="line1Price" placeholder="Unit Price" value={invoiceState.line1.price} onChange={e => {
                  let line1 = invoiceState.line1
                  const val = e.target.value
                  setInvoiceState(prevState => {
                    return { ...prevState, line1: { qty: line1.qty, description: line1.description, price: val, amount: line1.amount } }
                  });
                }} />
              </CCol>
              <CCol xs="12" md="3">
                <CInput type="number" name="line1Amount" placeholder="Amount" value={invoiceState.line1.qty * invoiceState.line1.price} disabled />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol xs="12" md="2">
                <CInput type="number" name="line2QTY" placeholder="QTY" value={invoiceState.line2.qty} onChange={e => {
                  let line2 = invoiceState.line2
                  const val = e.target.value
                  setInvoiceState(prevState => {
                    return { ...prevState, line2: { qty: val, description: line2.description, price: line2.price, amount: line2.amount } }
                  });
                }} />
              </CCol>
              <CCol xs="12" md="4">
                <CTextarea type="text" rows="1" name="line2Description" placeholder="Description" value={invoiceState.line2.description} onChange={e => {
                  let line2 = invoiceState.line2
                  const val = e.target.value
                  setInvoiceState(prevState => {
                    return { ...prevState, line2: { qty: line2.qty, description: val, price: line2.price, amount: line2.amount } }
                  });
                }} />
              </CCol>
              <CCol xs="12" md="3">
                <CInput type="number" name="line2Price" placeholder="Unit Price" value={invoiceState.line2.price} onChange={e => {
                  let line2 = invoiceState.line2
                  const val = e.target.value
                  setInvoiceState(prevState => {
                    return { ...prevState, line2: { qty: line2.qty, description: line2.description, price: val, amount: line2.amount } }
                  });
                }} />
              </CCol>
              <CCol xs="12" md="3">
                <CInput type="number" name="line2Amount" placeholder="Amount" value={invoiceState.line2.qty * invoiceState.line2.price} disabled />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol xs="12" md="2">
                <CInput type="number" name="line3QTY" placeholder="QTY" value={invoiceState.line3.qty} onChange={e => {
                  let line3 = invoiceState.line3
                  const val = e.target.value
                  setInvoiceState(prevState => {
                    return { ...prevState, line3: { qty: val, description: line3.description, price: line3.price, amount: line3.amount } }
                  });
                }} />
              </CCol>
              <CCol xs="12" md="4">
                <CTextarea type="text" rows="1" name="line3Description" placeholder="Description" value={invoiceState.line3.description} onChange={e => {
                  let line3 = invoiceState.line3
                  const val = e.target.value
                  setInvoiceState(prevState => {
                    return { ...prevState, line3: { qty: line3.qty, description: val, price: line3.price, amount: line3.amount } }
                  });
                }} />
              </CCol>
              <CCol xs="12" md="3">
                <CInput type="number" name="line3Price" placeholder="Unit Price" value={invoiceState.line3.price} onChange={e => {
                  let line3 = invoiceState.line3
                  const val = e.target.value
                  setInvoiceState(prevState => {
                    return { ...prevState, line3: { qty: line3.qty, description: line3.description, price: val, amount: line3.amount } }
                  });
                }} />
              </CCol>
              <CCol xs="12" md="3">
                <CInput type="number" name="line3Amount" placeholder="Amount" value={invoiceState.line3.qty * invoiceState.line3.price} disabled />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol xs="12" md="2">
                <CInput type="number" name="line4QTY" placeholder="QTY" value={invoiceState.line4.qty} onChange={e => {
                  let line4 = invoiceState.line4
                  const val = e.target.value
                  setInvoiceState(prevState => {
                    return { ...prevState, line4: { qty: val, description: line4.description, price: line4.price, amount: line4.amount } }
                  });
                }} />
              </CCol>
              <CCol xs="12" md="4">
                <CTextarea type="text" rows="1" name="line4Description" placeholder="Description" value={invoiceState.line4.description} onChange={e => {
                  let line4 = invoiceState.line4
                  const val = e.target.value
                  setInvoiceState(prevState => {
                    return { ...prevState, line4: { qty: line4.qty, description: val, price: line4.price, amount: line4.amount } }
                  });
                }} />
              </CCol>
              <CCol xs="12" md="3">
                <CInput type="number" name="line4Price" placeholder="Unit Price" value={invoiceState.line4.price} onChange={e => {
                  let line4 = invoiceState.line4
                  const val = e.target.value
                  setInvoiceState(prevState => {
                    return { ...prevState, line4: { qty: line4.qty, description: line4.description, price: val, amount: line4.amount } }
                  });
                }} />
              </CCol>
              <CCol xs="12" md="3">
                <CInput type="number" name="line4Amount" placeholder="Amount" value={invoiceState.line4.qty * invoiceState.line4.price} disabled />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol xs="12" md="2">
                <CInput type="number" name="line5QTY" placeholder="QTY" value={invoiceState.line5.qty} onChange={e => {
                  let line5 = invoiceState.line5
                  const val = e.target.value
                  setInvoiceState(prevState => {
                    return { ...prevState, line5: { qty: val, description: line5.description, price: line5.price, amount: line5.amount } }
                  });
                }} />
              </CCol>
              <CCol xs="12" md="4">
                <CTextarea type="text" rows="1" name="line5Description" placeholder="Description" value={invoiceState.line5.description} onChange={e => {
                  let line5 = invoiceState.line5
                  const val = e.target.value
                  setInvoiceState(prevState => {
                    return { ...prevState, line5: { qty: line5.qty, description: val, price: line5.price, amount: line5.amount } }
                  });
                }} />
              </CCol>
              <CCol xs="12" md="3">
                <CInput type="number" name="line5Price" placeholder="Unit Price" value={invoiceState.line5.price} onChange={e => {
                  let line5 = invoiceState.line5
                  const val = e.target.value
                  setInvoiceState(prevState => {
                    return { ...prevState, line5: { qty: line5.qty, description: line5.description, price: val, amount: line5.amount } }
                  });
                }} />
              </CCol>
              <CCol xs="12" md="3">
                <CInput type="number" name="line5Amount" placeholder="Amount" value={invoiceState.line5.qty * invoiceState.line5.price} disabled />
              </CCol>
            </CFormGroup>
            <CFormGroup row />
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="invoice-note">Special Note</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CTextarea name="invoiceNote" placeholder="Special Notes" value={invoiceState.note} onChange={e => {
                  const val = e.target.value
                  setInvoiceState(prevState => {
                    return { ...prevState, note: val }
                  });
                }} />
              </CCol>
            </CFormGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalInvoice(false)}>Cancel</CButton>
          <CButton color="primary" onClick={() => generateInvoice()}>Submit</CButton>
        </CModalFooter>
      </CModal>

      <CModal show={modalReceipt} onClose={setModalReceipt} size="lg">
        <CModalHeader>
          <CModalTitle>Custom Payment Receipt</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="receipt-total">Invoice Total</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput type="number" name="receiptTotal" placeholder="Invoice Total" value={receiptState.total} onChange={e => {
                  const val = e.target.value
                  setReceiptState(prevState => {
                    return { ...prevState, total: val }
                  });
                }} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="receipt-delegation">Invoice Delegation</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CSelect custom name="receiptDelegation" value={receiptState.delegation} onChange={e => {
                  const val = e.target.value
                  setReceiptState(prevState => {
                    return { ...prevState, delegation: val }
                  });
                }}>
                  {getDelegations(data.registrationData)}
                </CSelect>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="receipt-description">For Payment of</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CTextarea name="receiptDescription" placeholder="Description" value={receiptState.description} onChange={e => {
                  const val = e.target.value
                  setReceiptState(prevState => {
                    return { ...prevState, description: val }
                  });
                }} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="receipt-note">Special Note</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CTextarea name="receiptNote" placeholder="Special Notes" value={receiptState.note} onChange={e => {
                  const val = e.target.value
                  setReceiptState(prevState => {
                    return { ...prevState, note: val }
                  });
                }} />
              </CCol>
            </CFormGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalReceipt(false)}>Cancel</CButton>
          <CButton color="primary" onClick={() => generateReceipt()}>Submit</CButton>
        </CModalFooter>
      </CModal>
    </>
  ) : (<p>Waiting for Data...</p>)
}

export default PaymentInvoicing