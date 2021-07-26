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
import { invoicePDF, receiptPDF } from 'src/reusable/jsPDF'

import registrationData from '../../data/MockData/MockRegistration'

import { exportTable, getDelegateFee, getInvoiceTotal, getDelegations } from './paymentInvoicingHelper'

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
  const [modalInvoice, setModalInvoice] = useState(false)
  const [modalReceipt, setModalReceipt] = useState(false)

  const [invoiceState, setInvoiceState] = useState({
    number: '',
    delegation: '',
    line1: { qty: '', description: '', price: '', amount: '' },
    line2: { qty: '', description: '', price: '', amount: '' },
    line3: { qty: '', description: '', price: '', amount: '' },
    line4: { qty: '', description: '', price: '', amount: '' },
    line5: { qty: '', description: '', price: '', amount: '' },
    note: ''
  })

  const [receiptState, setReceiptState] = useState({
    number: '',
    delegation: '',
    total: '',
    description: '',
    note: ''
  })

  function openInvoiceModal() {
    setInvoiceState({
      number: '',
      delegation: '',
      line1: { qty: '', description: '', price: '', amount: '' },
      line2: { qty: '', description: '', price: '', amount: '' },
      line3: { qty: '', description: '', price: '', amount: '' },
      line4: { qty: '', description: '', price: '', amount: '' },
      line5: { qty: '', description: '', price: '', amount: '' },
      note: ''
    })

    setModalInvoice(!modalInvoice)
  }

  function generateInvoice() {
    let item = invoiceState

    let i;
    for(i = 0; i < registrationData.length; i++) {
      if(registrationData[i].delegation === item.delegation) {
        item["contact"] = registrationData[i].contact
        item["street"] = registrationData[i].street
        item["city"] = registrationData[i].city
        item["state"] = registrationData[i].state
        item["zipcode"] = registrationData[i].zipcode
      }
    } 

    let amounts = [item.line1.amount, item.line2.amount, item.line3.amount, item.line4.amount, item.line5.amount]
    let total = 0

    let j;
    for(j = 0; j < amounts.length; j++) {
      if(amounts[j] !== "") {
        total = + total + Number(amounts[j])
      }
    }

    item["total"] = total

    invoicePDF(item)

    setModalInvoice(false)
  }


  function openReceiptModal() {
    setReceiptState({
      number: '',
      delegation: '',
      total: '',
      description: '',
      note: ''
    })

    setModalReceipt(!modalReceipt)
  }

  function generateReceipt() {
    let item = receiptState

    let i;
    for(i = 0; i < registrationData.length; i++) {
      if(registrationData[i].delegation === item.delegation) {
        item["contact"] = registrationData[i].contact
        item["street"] = registrationData[i].street
        item["city"] = registrationData[i].city
        item["state"] = registrationData[i].state
        item["zipcode"] = registrationData[i].zipcode
      }
    } 

    receiptPDF(item)

    setModalReceipt(false)
  }

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Payment Invoicing Data
              <Export data={exportTable()} filename="PaymentInvoicing.csv" />
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
                items={registrationData}
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
                            <CDropdownItem>Reverse Status</CDropdownItem>
                            <CDropdownItem onClick={() => invoicePDF(item)}>Download Payment Invoice</CDropdownItem>
                            <CDropdownItem onClick={() => receiptPDF(item)}>Download Payment Receipt</CDropdownItem>
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
                <CLabel htmlFor="invoice-number">Invoice Number</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput type="number" name="invoiceNumber" placeholder="Invoice Number" value={invoiceState.number} onChange={e => {
                  const val = e.target.value
                  setInvoiceState(prevState => {
                    return { ...prevState, number: val }
                  });
                }} />
              </CCol>
            </CFormGroup>
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
                  {getDelegations()}
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
                <CInput type="number" name="line1QTY" placeholder="#" value={invoiceState.line1.qty} onChange={e => {
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
                <CInput type="number" name="line1Amount" placeholder="Amount" value={invoiceState.line1.amount} onChange={e => {
                  let line1 = invoiceState.line1
                  const val = e.target.value
                  setInvoiceState(prevState => {
                    return { ...prevState, line1: { qty: line1.qty, description: line1.description, price: line1.price, amount: val } }
                  });
                }} />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol xs="12" md="2">
                <CInput type="number" name="line2QTY" placeholder="#" value={invoiceState.line2.qty} onChange={e => {
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
                <CInput type="number" name="line2Amount" placeholder="Amount" value={invoiceState.line2.amount} onChange={e => {
                  let line2 = invoiceState.line2
                  const val = e.target.value
                  setInvoiceState(prevState => {
                    return { ...prevState, line2: { qty: line2.qty, description: line2.description, price: line2.price, amount: val } }
                  });
                }} />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol xs="12" md="2">
                <CInput type="number" name="line3QTY" placeholder="#" value={invoiceState.line3.qty} onChange={e => {
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
                <CInput type="number" name="line3Amount" placeholder="Amount" value={invoiceState.line3.amount} onChange={e => {
                  let line3 = invoiceState.line3
                  const val = e.target.value
                  setInvoiceState(prevState => {
                    return { ...prevState, line3: { qty: line3.qty, description: line3.description, price: line3.price, amount: val } }
                  });
                }} />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol xs="12" md="2">
                <CInput type="number" name="line4QTY" placeholder="#" value={invoiceState.line4.qty} onChange={e => {
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
                <CInput type="number" name="line4Amount" placeholder="Amount" value={invoiceState.line4.amount} onChange={e => {
                  let line4 = invoiceState.line4
                  const val = e.target.value
                  setInvoiceState(prevState => {
                    return { ...prevState, line4: { qty: line4.qty, description: line4.description, price: line4.price, amount: val } }
                  });
                }} />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol xs="12" md="2">
                <CInput type="number" name="line5QTY" placeholder="#" value={invoiceState.line5.qty} onChange={e => {
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
                <CInput type="number" name="line5Amount" placeholder="Amount" value={invoiceState.line5.amount} onChange={e => {
                  let line5 = invoiceState.line5
                  const val = e.target.value
                  setInvoiceState(prevState => {
                    return { ...prevState, line5: { qty: line5.qty, description: line5.description, price: line5.price, amount: val } }
                  });
                }} />
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
                <CLabel htmlFor="receipt-number">Invoice Number</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput type="number" name="receiptNumber" placeholder="Invoice Number" value={receiptState.number} onChange={e => {
                  const val = e.target.value
                  setReceiptState(prevState => {
                    return { ...prevState, number: val }
                  });
                }} />
              </CCol>
            </CFormGroup>
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
                  {getDelegations()}
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
  )
}

export default PaymentInvoicing