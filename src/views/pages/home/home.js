import React,{useState} from 'react'
import ModalVideo from 'react-modal-video'
import { Link } from 'react-scroll'
import { CButton, CRow } from '@coreui/react'
import { useAuth0 } from "@auth0/auth0-react";

import './home.css'
import '../../../../node_modules/react-modal-video/scss/modal-video.scss';

import banner from '../../../assets/branding/Banner.svg'

import documents from "../../../assets/home/screenshots/Documents.png"
import dashboard from "../../../assets/home/screenshots/Dashboard.png"
import alerts from "../../../assets/home/screenshots/Alerts.png"
import delegationAwards from "../../../assets/home/screenshots/DelegationAwards.png"

const Home = () => {
  const { loginWithRedirect } = useAuth0();

  const [isOpen, setOpen] = useState(false)


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

              <li> <CButton block color="primary" onClick={() => loginWithRedirect()} style={{ color: "#FFFFFF", padding: ".5em" }}>LOGIN</CButton> </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>

      <section id="hero" className="d-flex align-items-center">
        <div className="container" data-aos="zoom-out" data-aos-delay="100">
          <h1 style={{ color: "white" }}>The Future of Organizing <span>MUNWell</span></h1>
          <br></br>
          {/*<CButton style={{ width: "200px", margin: "auto" }} block color="primary" onClick={() => loginWithRedirect()}>Login / Register</CButton>*/}
          <ModalVideo channel='youtube' youtube={{mute:0,autoplay:1}} isOpen={isOpen} videoId="9LPFdiZRr_Y" onClose={() => setOpen(false)} />

          <CRow className="align-items-center">
            <CButton style={{ width: "200px", margin: "auto 1% auto auto" }} block color="primary" onClick={() => loginWithRedirect()}>Login / Register</CButton>
            <CButton style={{ width: "200px", margin: "auto auto auto 1%" }} block variant="outline" color="secondary" onClick={()=> setOpen(true)}><i className="far fa-play-circle"></i>&ensp;Watch Video</CButton>
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
                  <p className="description">Create an account and purchase an affordable MUNWell license plan under pricing.</p>
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
                  <p className="description">Using MUNWell's graphical user interface you can organize your conference in
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
              <h3>Why You'll Love <span>Organizing With MUNWell</span></h3>
            </div>

            <div className="row">
              <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
                <div className="icon-box">
                  <h4><span>Integrated Dashboard</span></h4>
                  <p>Away with dozens of spreadsheets to run a conference. With MUNWell’s integrated dashboard, any
                    information you could need is selectively curated into an unmatched graphical user interface, where
                    organizers can monitor trends and distributions to optimize their conference. </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in"
                data-aos-delay="200">
                <div className="icon-box">
                  <h4><span>Optimization Algorithm</span></h4>
                  <p>No more position assignment complaints. MUNWell’s optimization algorithm is designed to randomize
                    position assignments regardless of delegation, eliminating bias. However, manual mode is additionally
                    available for conference organizers. </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0" data-aos="zoom-in"
                data-aos-delay="300">
                <div className="icon-box">
                  <h4><span>Document Generation</span></h4>
                  <p>The days of endless copy and paste or cumbersome mail merging is now over. MUNWell utilizes internal
                    mail merging with conference settings to generate formatted invoices, receipts, placard sets,
                    awards, and more which can be easily downloaded and distributed.</p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in" data-aos-delay="100">
                <div className="icon-box">
                  <h4><span>Documented Support</span></h4>
                  <p>While MUNWell is designed for ease of use, utilizing an unmatched graphical user interface,
                    documentation for nearly all of MUNWell’s features are provided at the fingertips of conference
                    organizers through the documentation menu.</p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in" data-aos-delay="200">
                <div className="icon-box">
                  <h4><span>Exportable Data</span></h4>
                  <p>Need to do something not yet supported by MUNWell? Conference data can be exported to Excel/CSV
                    format giving full flexibility to organizers. Documentation on using Microsoft Office's mail
                    merging is also provided for organizers to use custom document templates.</p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in" data-aos-delay="300">
                <div className="icon-box">
                  <h4><span>Consistently Evolving</span></h4>
                  <p>While MUNWell currently supports a multitude of features that assists conference organizers, the MUNWell
                    team is consistently improving old features and introducing new ones. Public suggestions are welcome
                    through our suggestions menu item for MUNWell users.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="screenshots" className="portfolio">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Screenshots</h2>
              <h3>Check Out Some Of MUNWell’s <span>Views</span></h3>
            </div>

            <div className="row portfolio-container">
              <div className="col-lg-12 col-md-6 portfolio-item">
                <img src={dashboard} className="img-fluid" alt="" />
              </div>

              <div className="col-lg-12 col-md-6 portfolio-item">
                <img src={alerts} className="img-fluid" alt="" />
              </div>

              <div className="col-lg-12 col-md-6 portfolio-item">
                <img src={delegationAwards} className="img-fluid" alt="" />
              </div>
            </div>

            <div className="section-title">
              <h3>Check Out Some Of MUNWell’s <span>Generated Documents</span></h3>
            </div>

            <div className="row portfolio-container">
              <div className="col-lg-12 col-md-6 portfolio-item">
                <img src={documents} className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="pricing section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Pricing</h2>
              <h3>Available <span>MUNWell Licenses</span></h3>
              <p>MUNWell licenses enables access to all of MUNWell’s features for unlimited committees, unlimited registration entries, unlimited access on a yearly basis, and is accompanied with a live 1-hour MUNWell training session for conference organizers. MUNWell additionally implements a dynamic pricing model to ensure affordability regardless of conference size. To receive a quote, contact our sales department at <a href="mailto:contact.munwell@gmail.com" target="_blank" rel="noreferrer">contact.munwell@gmail.com</a>.</p>
              <p>Once a plan is purchased and processed, the conference organizer will be contacted via email with their MUNWell license within 48 hours upon which the organizer can begin utilizing all of the features that MUNWell has to offer.</p>
            </div>
            {/*
            <div className="row-home">
              <div className="col-lg-3 col-md-6 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="400">
                <div className="box">
                  <span className="advanced">Beta</span>
                  <h3>Platinum License</h3>
                  <h4><sup>$</sup>1,000 USD<span> / year</span></h4>
                  <ul>
                    <li>Unlimited Committees</li>
                    <li>Unlimited Delegations</li>
                    <li>Unlimited Independent Delegates</li>
                    <li>1 Hour MUNWell Training Session</li>
                  </ul>
                  <div className="btn-wrap">
                    <CButton color="primary">
                      <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=9KH46NNM8QQ6E" target="_blank" rel="noreferrer" style={{ color: "white" }}>Buy Now</a>
                    </CButton>
                  </div>
                </div>
              </div>
            </div>
            */}
          </div>
        </section >
      </main >

      <div style={{ height: "10px" }}>
        <footer id="footer">
          <div className="footerDIV">
            <Link to="hero" spy={true} smooth={true}><p className="footerLink"><i>The Future of Organizing </i><strong style={{ color: "#321fdb" }}>MUNWell</strong></p></Link>
            <a href="mailto:contact.munwell@gmail.com" target="_blank" rel="noreferrer">contact.munwell@gmail.com</a>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home
