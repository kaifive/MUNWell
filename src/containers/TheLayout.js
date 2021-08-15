import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import {
  CButton,
  CCol,
  CRow
} from '@coreui/react'

import fetchData from '../data/LiveData/FetchData'

import '../views/pages/page404/404.css'

const TheLayout = () => {
  const { user } = useAuth0()

  const { isAuthenticated, loginWithRedirect } = useAuth0()

  const [data, setData] = useState({
    committeeData: []
  });

  const [isLoading, setIsLoading] = useState(true)

  async function getData() {
    if (isAuthenticated) {
      await fetchData("/api/get/committee", user.sub, 'division').then((res) => {
        if (JSON.stringify(res) !== JSON.stringify(data.committeeData)) {
          setData(prevState => {
            return { ...prevState, committeeData: JSON.stringify(res) }
          })
        }
      })
    }
  }

  getData().then(() => {
    if (isLoading) {
      setIsLoading(false)
    }
  })

  return !isLoading ? (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  ) : (
    <>
      <link href="https://fonts.googleapis.com/css?family=Maven+Pro:400,900" rel="stylesheet" />
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>

      <div id="notfound">
        <div className="notfound">
          <h2>Login before accessing Manuel!</h2>
          <p>The page you are looking for requires a login before access.</p>

          <CRow className="justify-content-center">
            <CCol lg="3">
              <CButton onClick={() => loginWithRedirect()} block color="primary">Login</CButton>
            </CCol>
          </CRow>
        </div>
      </div>
    </>
  )
}

export default TheLayout
