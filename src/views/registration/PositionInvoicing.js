import React from 'react'
import {
  CBadge,
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
import { positionPDF } from 'src/reusable/jsPDF'

import registrationData from '../../data/MockData/MockRegistration'

import { getStatus, downloadPositionInvoice } from './positionInvoicingHelper'

const getBadge = balance => {
  switch (balance) {
    case 'Balanced': return 'success'
    case 'Unbalanced': return 'danger'
    default: return 'primary'
  }
}

const fields = [
  'status',
  'delegation',
  'contact',
  'email',
  'delegates',
  'actions'
]

const PositionInvoicing = () => {
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Position Assignment Invoicing Data
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
                scopedSlots={{
                  'status':
                    (item) => (
                      <td>
                        <CBadge color={getBadge(getStatus(item))}>
                          {getStatus(item)}
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
                            <CDropdownItem onClick={() => downloadPositionInvoice(item)}>Download Position Invoice</CDropdownItem>
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

export default PositionInvoicing