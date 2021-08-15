import React from 'react'
import { shallow } from 'enzyme/build'
import 'jest-canvas-mock';

import App from './App'

import Dashboard from './views/dashboard/Dashboard.js'
import Settings from './views/settings/Settings.js'

import Registration from './views/registration/Registration.js'
import CommitteeAllotments from './views/registration/CommitteeAllotments.js'
import PaymentInvoicing from './views/registration/PaymentInvoicing.js'
import PositionInvoicing from './views/registration/PositionInvoicing.js'

import CommitteeRoster from './views/committees/CommitteeRoster.js'

import CommitteeAwards from './views/awards/CommitteeAwards'
import DelegationAwards from './views/awards/DelegationAwards'
import ParticipationAwards from './views/awards/ParticipationAwards'

it('Manuel App mounts without crashing', () => {
  const wrapper = shallow(<App />)
  wrapper.unmount()
})

it('Manuel mounts Dashboard without crashing', () => {
  const wrapper = shallow(<Dashboard />)
  wrapper.unmount()
})

it('Manuel mounts Settings without crashing', () => {
  const wrapper = shallow(<Settings />)
  wrapper.unmount()
})

it('Manuel mounts Registration without crashing', () => {
  const wrapper = shallow(<Registration />)
  wrapper.unmount()
})

it('Manuel mounts Committee Allotments without crashing', () => {
  const wrapper = shallow(<CommitteeAllotments />)
  wrapper.unmount()
})

it('Manuel mounts Payment Invoicing without crashing', () => {
  const wrapper = shallow(<PaymentInvoicing />)
  wrapper.unmount()
})

it('Manuel mounts Position Invoicing without crashing', () => {
  const wrapper = shallow(<PositionInvoicing />)
  wrapper.unmount()
})

it('Manuel mounts Committee Roster without crashing', () => {
  const wrapper = shallow(<CommitteeRoster />)
  wrapper.unmount()
})

it('Manuel mounts Committee Awards without crashing', () => {
  const wrapper = shallow(<CommitteeAwards />)
  wrapper.unmount()
})

it('Manuel mounts Delegation Awards without crashing', () => {
  const wrapper = shallow(<DelegationAwards />)
  wrapper.unmount()
})

it('Manuel mounts Participation Awards without crashing', () => {
  const wrapper = shallow(<ParticipationAwards />)
  wrapper.unmount()
})