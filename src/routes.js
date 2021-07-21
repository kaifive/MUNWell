import React from 'react';

const PageNotFound = React.lazy(() => import('./views/pages/page404/Page404'));

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Documentation = React.lazy(() => import('./views/documentation/Documentation'));
const Settings = React.lazy(() => import('./views/settings/Settings'));

const Registration = React.lazy(() => import('./views/registration/Registration'));
const CommitteeAllotments = React.lazy(() => import('./views/registration/CommitteeAllotments'));
const PaymentInvoicing = React.lazy(() => import('./views/registration/PaymentInvoicing'));
const PositionInvoicing = React.lazy(() => import('./views/registration/PositionInvoicing'));

const CommitteeRoster = React.lazy(() => import('./views/committees/CommitteeRoster'));
const Committee = React.lazy(() => import('./views/committees/Committee'));
const Awards = React.lazy(() => import('./views/committees/Award'));

const CommitteeAwards = React.lazy(() => import('./views/awards/CommitteeAwards'));
const DelegationAwards = React.lazy(() => import('./views/awards/DelegationAwards'));
const ParticipationAwards = React.lazy(() => import('./views/awards/ParticipationAwards'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/404', name: '404', component: PageNotFound },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/documentation', name: 'Documentation', component: Documentation },
  { path: '/settings', name: 'Settings', component: Settings },
  { path: '/registration/registration-data', name: 'Registration Data', component: Registration },
  { path: '/registration/committee-allotments', name: 'Committee Allotments', component: CommitteeAllotments },
  { path: '/registration/payment-invoicing', name: 'Payment Invoicing', component: PaymentInvoicing },
  { path: '/registration/position-invoicing', name: 'Position Invoicing', component: PositionInvoicing },
  { path: '/committees/committee-roster', name: 'Committee Roster', component: CommitteeRoster },
  { path: '/committees/:committee', name: 'Committee', component: Committee },
  { path: '/award/:committee', name: 'Awards', component: Awards },
  { path: '/awards/committee-awards', name: 'Committee Awards', component: CommitteeAwards },
  { path: '/awards/delegation-awards', name: 'Delegation Awards', component: DelegationAwards },
  { path: '/awards/participation-awards', name: 'Participation Awards', component: ParticipationAwards }
];

export default routes;
