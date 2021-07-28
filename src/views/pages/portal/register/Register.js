import React from 'react'
import {
    CButton,
} from '@coreui/react'
import banner from '../../../../assets/branding/Banner.svg'

import '../portal.css'

const Register = () => {
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
                                        <h4 className="card-title">Register</h4>
                                        <form method="POST" className="my-login-validation" noValidate="">
                                            <div className="form-group">
                                                <label for="name">Contact Name</label>
                                                <input id="name" type="text" class="form-control" name="name" required autofocus />
                                                <div class="invalid-feedback">
                                                    Enter your name
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label for="email">Email Address</label>
                                                <input id="email" type="email" class="form-control" name="email" required />
                                                <div class="invalid-feedback">
                                                    Email is invalid
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label for="password">Password</label>
                                                <input id="password" type="password" class="form-control" name="password" required data-eye />
                                                <div class="invalid-feedback">
                                                    Password is required
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label for="passwordConf">Repeat Password</label>
                                                <input id="passwordConf" type="password" class="form-control" name="passwordConf" required data-eye />
                                                <div class="invalid-feedback">
                                                    Passwords do not match
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <div class="custom-checkbox custom-control">
                                                    <input type="checkbox" name="agree" id="agree" class="custom-control-input" required="" />
                                                    <label for="agree" class="custom-control-label">I agree to the <a href="#/">Terms and Conditions</a></label>
                                                    <div class="invalid-feedback">
                                                        You must agree with our Terms and Conditions
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group m-0">
                                                <CButton block color="primary" href="#/dashboard">Register</CButton>
                                            </div>
                                            <div className="mt-4 text-center">
                                                Already have an account? <a href="#/login">Login</a>
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

export default Register
