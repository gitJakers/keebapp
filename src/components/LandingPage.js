import React from 'react'
import Button from 'react-bootstrap/Button'
import { useState, useContext, useEffect } from 'react';
import UploadModal from './UploadModal.js';
import Banner from './Banner.js';
import UserContext from '../context/UserContext.js';
import Footer from './Footer.js';
import PersonalBuild from '../assets/CompPeripherals (2).jpg';

export default function LandingPage() {
  
  const { currentUser } = useContext(UserContext);

  return (
    <>
      {/* Page Container */}
      <div>
        {/* Hero Image / Site Banner Here */}
        <Banner title="Mechanical Gallery" />
        {/* Landing Page Body */}
        <div id="landingPage">
          {/* About Section Here */}
          <div id="aboutBox">
            <div id="aboutTitleBox">
              <h2 id="aboutTitle">About Us</h2>
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
        </div>
        <Footer user={currentUser} />
      </div>
    </>
  )
}
