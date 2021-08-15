import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import {
  CButton,
  CCol,
  CRow
} from '@coreui/react'

import './404.css'

const Page404 = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <>
      <link href="https://fonts.googleapis.com/css?family=Maven+Pro:400,900" rel="stylesheet" />
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>

      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>404</h1>
          </div>
          <h2>We are sorry, Page not found!</h2>
          <p>The page you are looking for does not exist, or is temporarily unavailable.</p>

          <CRow className="justify-content-center">
            <CCol lg="3">
              <CButton onClick={() => loginWithRedirect()} block color="primary">Back to Dashboard</CButton>
            </CCol>
          </CRow>
        </div>
      </div>
    </>
  )
}

export default Page404
