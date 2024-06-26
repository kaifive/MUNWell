import React from 'react'
import CIcon from '@coreui/icons-react'


const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    /*    
    badge: {
      color: 'info',
      text: 'NEW',
    } */
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Documentation',
    to: '/documentation',
    icon: 'cil-align-center',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Settings',
    to: '/settings',
    icon: 'cil-settings',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Registration']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Registration Data',
    to: '/registration/registration-data',
    icon: 'cil-list-rich',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Committee Allotments',
    to: '/registration/committee-allotments',
    icon: 'cil-list',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Payment Invoicing',
    to: '/registration/payment-invoicing',
    icon: 'cil-dollar',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Position Invoicing',
    to: '/registration/position-invoicing',
    icon: 'cil-layers',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Committees']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Committee Roster',
    to: '/committees/committee-roster',
    icon: 'cil-globe-alt',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Awards']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Committee Awards',
    to: '/awards/committee-awards',
    icon: 'cil-list-numbered',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Delegation Awards',
    to: '/awards/delegation-awards',
    icon: 'cil-list-numbered',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Participation Awards',
    to: '/awards/participation-awards',
    icon: 'cil-list-numbered',
  }
]

export function getNav(committeeData) {

  return insertCommittees(committeeData);

}

function getIndividualCommittees(name, id) {
  let item =
  {
    _tag: 'CSidebarNavDropdown',
    name: name,
    route: '/base',
    icon: 'cil-puzzle',
    _id: id,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Position Assignments',
        to: '/committees/' + id,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Individual Awards',
        to: '/award/' + id,
      }
    ],
  }

  return item
}

function insertCommittees(committeeData) {
  let navBar = _nav

  let j;
  for (j = 0; j < navBar.length; j++) {
    if (navBar[j]._id !== undefined) {
      navBar.splice(j, 1)
      j--;
    }
  }

  let i;
  for (i = 0; i < committeeData.length; i++) {
    let name = ""

    if (committeeData[i].abbreviation !== "") {
      name = committeeData[i].abbreviation
    } else {
      name = committeeData[i].committee
    }

    navBar.splice(navBar.length - 4, 0, getIndividualCommittees(name, committeeData[i]._id))
  }

  return navBar
}


