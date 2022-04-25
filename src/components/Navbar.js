import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UploadModal from './UploadModal.js';
import LoginModal from './LoginModal.js';
import UserContext from '../context/UserContext.js';
import '../styles/NavbarStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faKeyboard, faScroll, faLink } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
    const { currentUser } = useContext(UserContext);
    return (
        <div className="navGroup">
            <div className="navPages">
                <div className="linkBox">
                    <Link to="/">
                        <div className="navBtnGroup">
                            <FontAwesomeIcon className="fa-1x" icon={faHouseChimney} />
                            <h3 className="navLinks">
                                Home
                            </h3>
                        </div>
                    </Link>
                </div>
                <div className="linkBox">
                    <Link to="/Builds">
                        <div className="navBtnGroup">
                            <FontAwesomeIcon className="fa-1x" icon={faKeyboard} />
                            <h3 className="navLinks">
                                Builds
                            </h3>
                        </div>
                    </Link>
                </div>
                <div className="linkBox">
                    <Link to="/History">
                    <div className="navBtnGroup">
                            <FontAwesomeIcon className="fa-1x" icon={faScroll} />
                        <h3 className="navLinks">
                            History
                        </h3>
                        </div>
                    </Link>
                </div>
                <div className="linkBox">
                    <Link to="/Resources">
                        <div className="navBtnGroup">
                            <FontAwesomeIcon  className="fa-1x" icon={faLink} />
                        <h3 className="navLinks">
                            Resources
                        </h3>
                        </div>
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
