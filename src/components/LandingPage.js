import React from 'react'
import Button from 'react-bootstrap/Button'
import { useState, useContext, useEffect } from 'react';
import UploadModal from './UploadModal.js';
import Banner from './Banner.js';
import UserContext from '../context/UserContext.js';
import Footer from './Footer.js';
import PersonalBuild from '../assets/CompPeripherals (2).jpg';
import '../styles/LandingStyles.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function LandingPage() {

  const { currentUser } = useContext(UserContext);

  return (
    <>
      {/* Page Container */}
      <div>
        <Banner title="Mechanical Gallery" />
        <Container fluid="true" id="landingContainer">
          <Row>
            <Col>
              <h2 id="aboutTitle">About Mechanical Gallery</h2>
            </Col>
          </Row>
          <Row>
            <Col md="2" lg="3"></Col>
            <Col md="8" lg="6">
              <div className="aboutDescBox">
                <p className="aboutDescription">
                  Mechanical Gallery is a site dedicated to custom mechanical keyboard builds.
                  Here you will be able to see many different kinds of keyboards you may not
                  have thought possible, and hopefully find just a bit of inspiration. For example 
                  take a look at this custom keyboard!
                </p>
              </div>
              <div id="aboutImageBox">
                <img src={PersonalBuild} id="aboutMainImage" alt="split keyboard" title="Jacob's Personal Build" />
                <p id="aboutImageCaption">My Personal Mechanical Keyboard - Jacob R.</p>
              </div>
              <div className="aboutDescBox">
                <p className="aboutDescription">
                  The main goal for this site is to primarily serve as a tool to view other custom
                  keyboard builds, learn more about their history and what components they have. 
                  This site also has a resource page which currently has some links to other useful
                  sites that are involved with custom keyboards. Take a look around and maybe even
                  make an account if you feel like uploading your own build!
                </p>
              </div>
            </Col>
            <Col md="2" lg="3"></Col>
          </Row>
          {/* Hero Image / Site Banner Here */}
          {/* Landing Page Body */}
          {/* <div id="landingPage">
            <div id="aboutBox">
              <div id="aboutTitleBox">
                <h2 id="aboutTitle">About Mechanical Gallery</h2>
              </div>
              <div id="aboutMainSection">
                <div id="aboutImageBox">
                  <img src={PersonalBuild} id="aboutMainImage" alt="split keyboard" title="Jacob's Personal Build" />
                  <p id="aboutImageCaption">My Personal Mechanical Keyboard - Jacob R.</p>
                </div>
                <div id="aboutDescBox">
                  <p id="aboutDescription">
                    Mechanical Gallery is a site dedicated to custom mechanical keyboard builds.
                    Here you will be able to see many different kinds of keyboards you may not
                    have thought possible, and hopefully find just a bit of inspiration.
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </Container>
        <Footer user={currentUser} />
      </div>
    </>
  )
}
