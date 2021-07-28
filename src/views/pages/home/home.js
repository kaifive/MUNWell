import React, { useRef } from 'react'
import { Link } from 'react-scroll'
import {
  CButton,
  CCol,
  CRow
} from '@coreui/react'

import './home.css'

import banner from '../../../assets/branding/PageBanner.svg'

import testPicture from './img/portfolio/portfolio-1.jpg'
import testPicture2 from './img/portfolio/portfolio-2.jpg'

const Home = () => {
  let test = useRef()

  return (
    <>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />

      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Roboto:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
        rel="stylesheet" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css" crossOrigin="anonymous" />

      <header id="header" className="d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">
          <a href="/" className="logo"><img src={banner} alt="" /></a>
          <nav id="navbar" className="navbar">
            <ul>
              <li><Link className="nav-link scrollto" activeClass="active" to="hero" spy={true} smooth={true}>Home</Link></li>
              <li><Link className="nav-link scrollto" to="getting-started" spy={true} smooth={true}>Getting Started</Link></li>
              <li><Link className="nav-link scrollto" to="features" spy={true} smooth={true}>Features</Link></li>
              <li><Link className="nav-link scrollto" to="screenshots" spy={true} smooth={true}>Screenshots</Link></li>
              <li><Link className="nav-link scrollto" to="pricing" spy={true} smooth={true}>Pricing</Link></li>

              <li> <CButton block color="primary" href="#/login" style={{ color: "#FFFFFF", padding: ".5em" }}>LOGIN</CButton> </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>

      <section id="hero" ref={test} className="d-flex align-items-center">
        <div className="container" data-aos="zoom-out" data-aos-delay="100">
          <h1>Introducing <span>MANUEL</span></h1>
          <h2><i>The Future of Organizing MUN Well</i></h2>
          <CRow className="align-items-left">
            <CCol lg="2">
              <CButton block color="primary" href="#/login">Login / Register</CButton>
            </CCol>
            {/*
            <CCol lg="2">
              <CButton block variant="outline" color="primary"><i className="far fa-play-circle"></i>&ensp;Watch Video</CButton>
            </CCol>
            */}
          </CRow>
        </div>
      </section>

      <main id="main">
        <section id="getting-started" className="featured-services">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Getting Started</h2>
              <h3>Easy as <span>1-2-3</span></h3>
            </div>
            <div className="row-home" id="row-home">
              <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                <div className="icon-box" data-aos="fade-up" data-aos-delay="200">
                  <div className="icon"><i className="fas fa-shopping-cart"></i> </div>
                  <h4 className="title"><span>1. Purchase a License</span></h4>
                  <p className="description">Create an account and purchase an affordable Manuel license plan under pricing.</p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                <div className="icon-box" data-aos="fade-up" data-aos-delay="300">
                  <div className="icon"><i className="fas fa-sliders-h"></i> </div>
                  <h4 className="title"><span>2. Setup Your Account</span></h4>
                  <p className="description">Provide some basic information such as your conference settings and committee
                    roster.</p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                <div className="icon-box" data-aos="fade-up" data-aos-delay="400">
                  <div className="icon"><i className="fas fa-sitemap"></i> </div>
                  <h4 className="title"><span>3. Start Organizing</span></h4>
                  <p className="description">Using Manuel's graphical user interface you can organize your conference in
                    minutes.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="services section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Features</h2>
              <h3>Why You'll Love <span>Organizing With Manuel</span></h3>
            </div>

            <div className="row">
              <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
                <div className="icon-box">
                  <h4><span>Integrated Dashboard</span></h4>
                  <p>Away with dozens of spreadsheets to run a conference. With Manuel’s integrated dashboard, any
                    information you could need is selectively curated into an unmatched graphical user interface, where
                    organizers can monitor trends and distributions to optimize their conference. </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in"
                data-aos-delay="200">
                <div className="icon-box">
                  <h4><span>Optimization Algorithm</span></h4>
                  <p>No more position assignment complaints. Manuel’s optimization algorithm is designed to randomize
                    position assignments regardless of delegation, eliminating bias. However, manual mode is additionally
                    available for conference organizers. </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0" data-aos="zoom-in"
                data-aos-delay="300">
                <div className="icon-box">
                  <h4><span>Document Generation</span></h4>
                  <p>The days of endless copy and paste or cumbersome mail merging is now over. Manuel utilizes internal
                    mail merging with conference settings to generate formatted invoices, receipts, placard sets,
                    awards, and more which can be easily downloaded and distributed.</p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in" data-aos-delay="100">
                <div className="icon-box">
                  <h4><span>Documented Support</span></h4>
                  <p>While Manuel is designed for ease of use, utilizing an unmatched graphical user interface,
                    documentation for nearly all of Manuel’s features are provided at the fingertips of conference
                    organizers through the documentation menu.</p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in" data-aos-delay="200">
                <div className="icon-box">
                  <h4><span>Exportable Data</span></h4>
                  <p>Need to do something not yet supported by Manuel? Conference data can be exported to Excel/CSV
                    format giving full flexibility to organizers. Documentation on using Microsoft Office's mail
                    merging is also provided for organizers to use custom document templates.</p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in" data-aos-delay="300">
                <div className="icon-box">
                  <h4><span>Consistently Evolving</span></h4>
                  <p>While Manuel currently supports a multitude of features that assists conference organizers, the Manuel
                    team is consistently improving old features and introducing new ones. Public suggestions are welcome
                    through our suggestions menu item for Manuel users.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="screenshots" className="portfolio">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Screenshots</h2>
              <h3>Check Out <span>Screenshots of Manuel</span></h3>
            </div>

            <div className="row portfolio-container">
              <div className="col-lg-4 col-md-6 portfolio-item">
                <img src={testPicture} className="img-fluid" alt="" />
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item">
                <img src={testPicture2} className="img-fluid" alt="" />
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item">
                <img src={testPicture} className="img-fluid" alt="" />
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item">
                <img src={testPicture} className="img-fluid" alt="" />
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item">
                <img src={testPicture} className="img-fluid" alt="" />
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item">
                <img src={testPicture} className="img-fluid" alt="" />
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item">
                <img src={testPicture} className="img-fluid" alt="" />
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item">
                <img src={testPicture} className="img-fluid" alt="" />
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item">
                <img src={testPicture} className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="pricing section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Pricing</h2>
              <h3>Available <span>Manuel Licenses</span></h3>
              {/*<p>Manuel implements multiple license types for conferences to manage expenses dependent on their
                conference size. Each license enables access to all of Manuel’s features, however the scale a
                conference can operate is dependent on the license.
              </p>
              */}
              <p>While Manuel is in developmental and testing stages, the web application will be available for purchase at a fixed rate. This rate however will increase and fluctuate based on the number of committees and delegates a conference contains once the software has been debugged and new features are added.
              </p>
            </div>

            <div className="row-home">
              {/*
              <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
                <div className="box">
                  <h3>Silver</h3>
                  <h4><sup>$</sup>500 USD<span> / year</span></h4>
                  <ul>
                    <li>Max. of 5 Committees</li>
                    <li>Max. of 5 Delegations</li>
                    <li>Max. of 30 Independent Delegates</li>
                  </ul>
                  <div className="btn-wrap">
                    <CButton color="primary">Buy Now</CButton>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="200">
                <div className="box">
                  <h3>Gold</h3>
                  <h4><sup>$</sup>850 USD<span> / year</span></h4>
                  <ul>
                    <li>Max. of 10 Committees</li>
                    <li>Max. of 15 Delegations</li>
                    <li>Max. of 50 Independent Delegates</li>
                  </ul>
                  <div className="btn-wrap">
                    <CButton color="primary">Buy Now</CButton>
                  </div>
                </div>
              </div>
*/}
              <div className="col-lg-3 col-md-6 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="400">
                <div className="box">
                  <span className="advanced">Beta</span>
                  <h3>Platinum</h3>
                  <h4><sup>$</sup>500 USD<span> / year</span></h4>
                  <ul>
                    <li>Unlimited Committees</li>
                    <li>Unlimited Delegations</li>
                    <li>Unlimited Independent Delegates</li>
                  </ul>
                  <div className="btn-wrap">
                    <CButton color="primary">Buy Now</CButton>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <footer id="footer">
        <div className="footerDIV">
          <Link to="hero" spy={true} smooth={true}><p className="footerLink"><strong style={{color: "#321fdb"}}>Manuel:</strong> <i>The Future of Organizing MUN Well</i></p></Link>
          <a href="mailto:tuongkhai.nguyen@gmail.com" target="_blank" rel="noreferrer">tuongkhai.nguyen@gmail.com</a>
        </div>
      </footer>
    </>
  )
}

export default Home
