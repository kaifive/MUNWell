import React from 'react'
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
  countCommittees, countDelegations, countTotalDelegates,
  getIncome, getCommitteeList, getCommitteeValues,
  calculateConferenceCapacity, calculatePaymentCompletion, calculateDelegationBalance,
  countCommitteeCategory, countRegistrationTimeWindow, countDelegatesByCategory, countDelegatesByType
} from './dashboardHelper.js'

const Dashboard = () => {
  return (
    <>
      <CRow>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon text="committees" header={"" + countCommittees()} color="primary" iconPadding={false}>
            <CIcon width={24} name="cil-people" />
          </CWidgetIcon>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon text="delegations" header={"" + countDelegations()} color="primary" iconPadding={false}>
            <CIcon width={24} name="cil-people" />
          </CWidgetIcon>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon text="delegates" header={"" + countTotalDelegates()} color="primary" iconPadding={false}>
            <CIcon width={24} name="cil-user" />
          </CWidgetIcon>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon text="income" header={"$" + getIncome()} color="primary" iconPadding={false}>
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
                  data: getCommitteeValues('assigned')
                },
                {
                  label: 'Total Positions',
                  backgroundColor: '#ced2d8',
                  data: getCommitteeValues('total')
                }
              ]}
              labels={getCommitteeList()}
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
          <CWidgetProgress inverse color="primary" variant="inverse" value={calculateConferenceCapacity()} header={calculateConferenceCapacity() + "% Conference Capacity"} footer="Assigned Positions / Total Positions" />
        </CCol>
        <CCol xs="12" sm="6" lg="4">
          <CWidgetProgress inverse color="primary" variant="inverse" value={calculatePaymentCompletion()} header={calculatePaymentCompletion() + "% Payment Completion"} footer="Payments Recieved / Payments Expected" />
        </CCol>
        <CCol xs="12" sm="6" lg="4">
          <CWidgetProgress inverse color="primary" variant="inverse" value={calculateDelegationBalance()} header={calculateDelegationBalance() + "% Delegation Balance"} footer="Balanced Delegations / Total Delegations" />
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
                  data: [countCommitteeCategory('General Assembly'), countCommitteeCategory('Specialized Agency'), countCommitteeCategory('Crisis Committee'), countCommitteeCategory('Other')]
                }
              ]}
              labels={['General Assemblies', 'Specialized Agencies', 'Crisis Committees', 'Other']}
              options={{
                tooltips: {
                  enabled: true
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
                  data: [countRegistrationTimeWindow('Early'), countRegistrationTimeWindow('Regular'), countRegistrationTimeWindow('Late')]
                }
              ]}
              labels={['Early Registration', 'Regular Registration', 'Late Registration']}
              options={{
                tooltips: {
                  enabled: true
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
                  data: [countDelegatesByCategory('General Assembly'), countDelegatesByCategory('Specialized Agency'), countDelegatesByCategory('Crisis Committee'), countDelegatesByCategory('Other')]
                }
              ]}
              labels={['General Assemblies', 'Specialized Agencies', 'Crisis Committees', 'Other']}
              options={{
                tooltips: {
                  enabled: true
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
                  data: [countDelegatesByType('Delegation'), countDelegatesByType('Independent')]
                }
              ]}
              labels={['Delegation', 'Independent']}
              options={{
                tooltips: {
                  enabled: true
                }
              }}
            />
          </CCardBody>
        </CCard>
      </CCardGroup>

    </>
  )
}

export default Dashboard
