import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CRow,
  CWidgetIcon,
  CWidgetProgress
} from '@coreui/react'
import {
  CChartBar,
  CChartDoughnut,
} from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'

import {
  countDelegations, countTotalDelegates,
  getIncome, getCommitteeList, getCommitteeValues,
  calculateConferenceCapacity, calculatePaymentCompletion, calculateDelegationBalance,
  countCommitteeCategory, countRegistrationTimeWindow, countDelegatesByCategory, countDelegatesByType
} from './dashboardHelper.js'

import fetchData from 'src/data/LiveData/FetchData'

const Dashboard = () => {
  const { user } = useAuth0()
  const { isAuthenticated } = useAuth0()

  const [data, setData] = useState({
    committeeData: [],
    registrationData: [],
    settings: []
  });

  const [isLoading, setIsLoading] = useState(true)

  async function getData() {
    await fetchData('/api/get/committee', user.sub).then((res) => {
      if (JSON.stringify(res) !== JSON.stringify(data.committeeData)) {
        setData(prevState => {
          return { ...prevState, committeeData: res }
        })
      }
    })

    await fetchData('/api/get/registrationData', user.sub).then((res) => {
      if (JSON.stringify(res) !== JSON.stringify(data.registrationData)) {
        setData(prevState => {
          return { ...prevState, registrationData: res }
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
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon text="committees" header={"" + data.committeeData.length} color="primary" iconPadding={false}>
            <CIcon width={24} name="cil-people" />
          </CWidgetIcon>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon text="delegations" header={"" + countDelegations(data.registrationData)} color="primary" iconPadding={false}>
            <CIcon width={24} name="cil-people" />
          </CWidgetIcon>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon text="delegates" header={"" + countTotalDelegates(data.registrationData)} color="primary" iconPadding={false}>
            <CIcon width={24} name="cil-user" />
          </CWidgetIcon>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon text="income" header={"$" + getIncome(data.registrationData, data.settings)} color="primary" iconPadding={false}>
            <CIcon width={24} name="cil-dollar" />
          </CWidgetIcon>
        </CCol>
      </CRow>

      <CCardGroup>
        <CCard>
          <CCardHeader>
            Committee Capacity
          </CCardHeader>
          <CCardBody>
            <CChartBar
              datasets={[
                {
                  label: 'Assigned Delegates',
                  backgroundColor: '#321fdb',
                  data: getCommitteeValues('assigned', data.committeeData)
                },
                {
                  label: 'Total Positions',
                  backgroundColor: '#ced2d8',
                  data: getCommitteeValues('total', data.committeeData)
                }
              ]}
              labels={getCommitteeList(data.committeeData)}
              options={{
                tooltips: {
                  enabled: true
                },
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero: true
                    }
                  }]
                }
              }}
            />
          </CCardBody>
        </CCard>
      </CCardGroup>

      <br></br>

      <CRow>
        <CCol xs="12" sm="6" lg="4">
          <CWidgetProgress inverse color="primary" variant="inverse" value={calculateConferenceCapacity(data.committeeData)} header={calculateConferenceCapacity(data.committeeData) + "% Conference Capacity"} footer="Assigned Positions / Total Positions" />
        </CCol>
        <CCol xs="12" sm="6" lg="4">
          <CWidgetProgress inverse color="primary" variant="inverse" value={calculatePaymentCompletion(data.registrationData)} header={calculatePaymentCompletion(data.registrationData) + "% Payment Completion"} footer="Payments Recieved / Payments Expected" />
        </CCol>
        <CCol xs="12" sm="6" lg="4">
          <CWidgetProgress inverse color="primary" variant="inverse" value={calculateDelegationBalance(data.registrationData, data.committeeData)} header={calculateDelegationBalance(data.registrationData, data.committeeData) + "% Delegation Balance"} footer="Balanced Delegations / Total Delegations" />
        </CCol>
      </CRow>

      <CCardGroup columns className="cols-2" >
        <CCard>
          <CCardHeader>
            Committee Spread
          </CCardHeader>
          <CCardBody>
            <CChartDoughnut
              datasets={[
                {
                  backgroundColor: [
                    '#03254c',
                    '#1167b1',
                    '#2a9df4',
                    '#d0efff'
                  ],
                  data: [countCommitteeCategory('General Assembly', data.committeeData), countCommitteeCategory('Specialized Agency', data.committeeData), countCommitteeCategory('Crisis Committee', data.committeeData), countCommitteeCategory('Other', data.committeeData)]
                }
              ]}
              labels={['General Assemblies', 'Specialized Agencies', 'Crisis Committees', 'Other']}
              options={{
                tooltips: {
                  enabled: true
                },
                legend: {
                  position: 'right'
                }
              }}
            />
          </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader>
            Registration Time Window Spread
          </CCardHeader>
          <CCardBody>
            <CChartDoughnut
              datasets={[
                {
                  backgroundColor: [
                    '#03254c',
                    '#1167b1',
                    '#2a9df4'
                  ],
                  data: [countRegistrationTimeWindow('Early', data.registrationData), countRegistrationTimeWindow('Regular', data.registrationData), countRegistrationTimeWindow('Late', data.registrationData)]
                }
              ]}
              labels={['Early Registration', 'Regular Registration', 'Late Registration']}
              options={{
                tooltips: {
                  enabled: true
                },
                legend: {
                  position: 'right'
                }
              }}
            />
          </CCardBody>
        </CCard>
      </CCardGroup>

      <CCardGroup columns className="cols-2" >
        <CCard>
          <CCardHeader>
            Delegate Distribution by Committee Type
          </CCardHeader>
          <CCardBody>
            <CChartDoughnut
              datasets={[
                {
                  backgroundColor: [
                    '#03254c',
                    '#1167b1',
                    '#2a9df4',
                    '#d0efff'
                  ],
                  data: [countDelegatesByCategory('General Assembly', data.committeeData), countDelegatesByCategory('Specialized Agency', data.committeeData), countDelegatesByCategory('Crisis Committee', data.committeeData), countDelegatesByCategory('Other', data.committeeData)]
                }
              ]}
              labels={['General Assemblies', 'Specialized Agencies', 'Crisis Committees', 'Other']}
              options={{
                tooltips: {
                  enabled: true
                },
                legend: {
                  position: 'right'
                }
              }}
            />
          </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader>
            Delegate Distribution by Delegation Type
          </CCardHeader>
          <CCardBody>
            <CChartDoughnut
              datasets={[
                {
                  backgroundColor: [
                    '#03254c',
                    '#1167b1'
                  ],
                  data: [countDelegatesByType('Delegation', data.committeeData, data.registrationData), countDelegatesByType('Independent', data.committeeData, data.registrationData)]
                }
              ]}
              labels={['Delegation', 'Independent']}
              options={{
                tooltips: {
                  enabled: true
                },
                legend: {
                  position: 'right'
                }
              }}
            />
          </CCardBody>
        </CCard>
      </CCardGroup>
    </>
  ) : (<p>Waiting for Data...</p>)
}

export default Dashboard
