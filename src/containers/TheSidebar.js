import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAuth0 } from "@auth0/auth0-react";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import banner from '../assets/branding/Banner-TransparentWhite.svg'
import logo from '../assets/branding/Logo-TransparentWhite.png'

import fetchData from '../data/LiveData/FetchData'

import { getNav } from './_nav'

const TheSidebar = () => {
  const { user } = useAuth0()

  const [committeeData, setCommitteeData] = useState([]);

  fetchData('/api/get/committee', user.sub, 'abbreviation').then((res) => {
    if (JSON.stringify(res) !== JSON.stringify(committeeData)) {
      setCommitteeData(res)
    }
  })

  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  let navigation = getNav(committeeData)

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          src={banner}
          height={70}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          src={logo}
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
