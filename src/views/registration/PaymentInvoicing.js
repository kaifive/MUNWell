import React from 'react'
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
  CRow
} from '@coreui/react'
import { Export } from 'src/reusable'
import { invoicePDF, receiptPDF } from 'src/reusable/jsPDF'

import registrationData from '../../data/MockData/MockRegistration'

import { exportTable, getDelegateFee, getInvoiceTotal } from './paymentInvoicingHelper'

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
                  <CButton block color="primary">Custom Payment Invoice</CButton>
                </CCol>
                <CCol lg="3">
                  <CButton block color="primary">Custom Payment Receipt</CButton>
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
    </>
  )
}

export default PaymentInvoicing