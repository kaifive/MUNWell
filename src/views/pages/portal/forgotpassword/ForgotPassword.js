import React from 'react'
import {
  CButton,
} from '@coreui/react'
import banner from '../../../../assets/branding/Banner.png'

import '../portal.css'

const ForgotPassword = () => {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />

      <div className="my-login-page">
        <section className="h-100">
          <div className="container h-100">
            <div className="row justify-content-md-center h-100">
              <div className="card-wrapper">
                <a href="/" className="logo"><img src={banner} alt="" /></a>
                <div className="card fat">
                  <div className="card-body">
                    <h4 class="card-title">Forgot Password</h4>
                    <form method="POST" class="my-login-validation" novalidate="">
                      <div class="form-group">
                        <label for="email">Email Address</label>
                        <input id="email" type="email" class="form-control" name="email" value="" required autofocus />
                        <div class="invalid-feedback">
                          Email is invalid
                        </div>
                        <div class="form-text text-muted">
                          We will send a password reset link
                        </div>
                      </div>

                      <div class="form-group m-0">
                        <CButton block color="primary" href="#/dashboard">Reset Password</CButton>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossOrigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
      </div>
    </>
  )
}

export default ForgotPassword
