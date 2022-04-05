import React from 'react'
import DustBunny from '../assets/Dust Bunny.png';
import { Link } from 'react-router-dom'

export default function Footer({user:currentUser}) {
    return (
        <div id="footerOuter">
            <div className="footerBox">
                <img id="DustBunnyLogo" src={DustBunny} />
                <p id="footerLeftText">Designed & Developed <br /> by Jacob R.</p>
            </div>
            <div className="footerBox">
                <div id="footerCenterBox">
                    <Link to="/Builds">
                        <p className="footerText">Build Database</p>
                    </Link>
                    <Link to="/History">
                        <p className="footerText">History Lesson</p>
                    </Link>
                    {currentUser == null ? 
                    null 
                    : 
                    <Link to="/Profile">
                        <p className="footerText">Profile</p>
                    </Link>
                    }
                </div>
            </div>
        </div>
    )
}
