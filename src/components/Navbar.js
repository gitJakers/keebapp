import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UploadModal from './UploadModal.js';
import LoginModal from './LoginModal.js';
import UserContext from '../context/UserContext.js';
import '../styles/NavbarStyles.css';

export default function Navbar() {
    const { currentUser } = useContext(UserContext);
    return (
        <div className="navGroup">
            <div className="navPages">
                <div className="linkBox">
                    <Link to="/">
                        <h3 className="navLinks">
                            Home
                        </h3>
                    </Link>
                </div>
                <div className="linkBox">
                    <Link to="/Builds">
                        <h3 className="navLinks">
                            Builds
                        </h3>
                    </Link>
                </div>
                <div className="linkBox">
                    <Link to="/History">
                        <h3 className="navLinks">
                            History
                        </h3>
                    </Link>
                </div>
                <div className="linkBox">
                    <Link to="/Resources">
                        <h3 className="navLinks">
                            Resources
                        </h3>
                    </Link>
                </div>
            </div>
            <div className="navButtons">
                {currentUser === null ?
                    null
                    :
                    <UploadModal />
                }
                <LoginModal />
            </div>
        </div>
    )
}
