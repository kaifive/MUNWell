import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
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

import fetchData from '../../data/LiveData/FetchData'

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
  const { user } = useAuth0()
  const { isAuthenticated } = useAuth0()

  const [data, setData] = useState({
    registrationData: ["", ""],
    committeeData: ["", ""],
    allotmentData: [],
    settings: []
  });

  const [isLoading, setIsLoading] = useState(true)

  async function getData() {
    await fetchData("/api/get/registrationData", user.sub).then((res) => {
      if (JSON.stringify(res) !== JSON.stringify(data.registrationData)) {
        setData(prevState => {
          return { ...prevState, registrationData: JSON.stringify(res) }
        })
      }
    })

    await fetchData("/api/get/committee", user.sub, 'division').then((res) => {
      if (JSON.stringify(res) !== JSON.stringify(data.committeeData)) {
        setData(prevState => {
          return { ...prevState, committeeData: JSON.stringify(res) }
        })
      }
    })

    await fetchData("/api/get/allotments", user.sub, 'delegation').then((res) => {
      if (JSON.stringify(res) !== JSON.stringify(data.allotmentData)) {
        setData(prevState => {
          return { ...prevState, allotmentData: res }
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
              Position Assignment Invoicing Data
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={JSON.parse(data.registrationData)}
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
                        <CBadge color={getBadge(getStatus(item, JSON.parse(data.committeeData), data.allotmentData))}>
                          {getStatus(item, JSON.parse(data.committeeData), data.allotmentData)}
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
                            <CDropdownItem onClick={() => downloadPositionInvoice(item, JSON.parse(data.committeeData), data.allotmentData, data.settings)}>Download Position Invoice</CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </td>
                    )
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  ) : (<p>Waiting for Data...</p>)
}

export default PositionInvoicing