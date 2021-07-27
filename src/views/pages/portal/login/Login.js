import React from 'react'
import {
  CButton,
} from '@coreui/react'
import banner from '../../../../assets/branding/Banner.png'

import '../portal.css'

const Login = () => {
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
                    <h4 className="card-title">Login</h4>
                    <form method="POST" className="my-login-validation" noValidate="">
                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input id="email" type="email" className="form-control" name="email" required autoFocus />

                        <div className="invalid-feedback">
                          Email is invalid
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">Password
                          <a href="#/forgot" className="float-right">
                            Forgot Password?
                          </a>
                        </label>
                        <input id="password" type="password" className="form-control" name="password" required data-eye />
                        <div className="invalid-feedback">
                          Password is required
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="custom-checkbox custom-control">
                          <input type="checkbox" name="remember" id="remember" className="custom-control-input" />
                          <label htmlFor="remember" className="custom-control-label">Remember Me</label>
                        </div>
                      </div>

                      <div className="form-group m-0">
                        <CButton block color="primary" href="#/dashboard">Login</CButton>
                      </div>
                      <div className="mt-4 text-center">
                        Don't have an account? <a href="#/register">Create One</a>
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

export default Login
