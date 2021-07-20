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

import registrationData from '../../data/MockData/MockRegistration'
import committeeData from '../../data/MockData/MockCommittees'
import allotmentData from '../../data/MockData/MockAllotments'

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

function getStatus(item) {
  let assignedPositions = 0
  let allottedPositions = 0

  let i;
  for (i = 0; i < registrationData.length; i++) {
    if (registrationData[i].delegation === item.delegation) {
      let j;
      for (j = 0; j < committeeData.length; j++) {
        let assignments = committeeData[j].assignments.split(",")

        let k;
        for (k = 0; k < assignments.length; k++) {
          if (assignments[k] === item.delegation) {
            assignedPositions = assignedPositions + 1
          }
        }

        let l;
        for(l = 0; l < allotmentData.length; l++) {
          if(allotmentData[l].delegation === item.delegation) {
            allottedPositions = allottedPositions + allotmentData[l].allotments[committeeData[j].committee]
          }
        }
      }
    }

  }

  let status = ""

  if(assignedPositions - allottedPositions === 0) {
    status = "Balanced"
  } else {
    status = "Unbalanced"
  }

  return status
}

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
              <CRow className="align-items-left">
                <CCol lg="3">
                  <CButton block color="primary">Custom Position Invoice</CButton>
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
                            <CDropdownItem>Download Position Invoice</CDropdownItem>
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