import React, { useState, useContext, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Login, CreateAccount, GetUserByUsername, GetSavedBuildsByUserId, GetSavedBuildsById } from '../Services/apiService.js';
import UserContext from '../context/UserContext.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Dropdown from 'react-bootstrap/Dropdown'
import { Link } from 'react-router-dom'

export default function LoginModal() {

    //Variable States
    const { currentUser, setUser, loadedFromStorage } = useContext(UserContext);
    
    const [showModal, setModal] = useState(false);
    const [createBool, setCreate] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginToken, setToken] = useState(null);
    const [loginStatus, setStatus] = useState(false);
    const [serverLoading, setLoading] = useState(false);
    const [loginError, setError] = useState(false);

    const handleClose = () => setModal(false);
    const handleShow = () => setModal(true);
    const newUser = () => setCreate(!createBool);
    const handleUsername = (username) => setUsername(username);

    const signIn = async () => {
        setError(false);
        setLoading(true);
        if (createBool) {
            const createAccountData = await CreateAccount(username, password);
            if (createAccountData) {
                console.log("Account Create Successfully")
            } else {
                console.log("Username already exists please try again.")
            }
            // Need code for animation here 
        } else {
            const loginData = await Login(username, password);
            if (loginData.token === undefined) {
                setError(true);
            } else if (loginData.token !== undefined) {
                setToken(loginData.token)
                let user = await GetUserByUsername(username);
                setUser(user);
                setStatus(true);
                const savedArr = await GetSavedBuildsByUserId(user.id);
                await GetSavedBuildsById(savedArr);
                localStorage.setItem('UserId', user.id);
                localStorage.setItem('Username', user.username);
                localStorage.setItem('loginToken', loginData.token);
                // Animation code here as well
            }
        }
        setLoading(false);
    }

    // Local storage needed here
    const logout = async () => {
        console.log("logout now")
        localStorage.removeItem('UserId');
        localStorage.removeItem('Username');
        localStorage.removeItem('loginToken');
        console.log(currentUser);
        // Remove local storage key 
    }

    return (
        <>
            {/* Ternary for displaying different buttons */}
            {currentUser !== null
                ?
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {currentUser.username}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Link to="/Profile">
                            <Dropdown.Item as="button">Go to profile</Dropdown.Item>
                        </Link>
                        {/* <Dropdown.Item href="#/action-2" onClick={() => console.log("Toggle theme")}>Dark / Light Mode</Dropdown.Item> */}
                        <Dropdown.Divider />
                        <Dropdown.Item href="/" onClick={logout}>Logout</Dropdown.Item>
                        {/* <Button onClick={() => logout()}>Logout</Button> */}
                    </Dropdown.Menu>
                </Dropdown>
                :
                <Button onClick={handleShow}>Sign In</Button>
            }
            {/* Modal For logging in */}
            <Modal id="loginModal" show={showModal} onHide={handleClose} centered>
                {/* Ternary here for login animation */}
                <Modal.Header id="loginModalHeader">
                    {/* <FontAwesomeIcon id="loadingSpinner" icon={faSpinner}/> */}
                    {/* <p>Testing</p> */}
                    <span>
                        {loginStatus ?
                            <>
                                <Modal.Title id="successMTitle">Sign in successful</Modal.Title>
                                <br />
                            </>
                            :
                            <Modal.Title>{createBool ? "Register Account" : "Sign In"}</Modal.Title>
                        }
                        {loginStatus ?
                            null
                            :
                            <p>{createBool ? "Create an account to upload" : "Sign in to upload builds"}</p>
                        }
                    </span>
                </Modal.Header>
                {/* Modal Body */}
                <Modal.Body className="modalBody">
                    {/* Error Message Ternary */}
                    {loginError ?
                        <>
                            <p>Incorrect Username or Password</p>
                            <p>Please try again</p>
                        </>
                        :
                        null
                    }
                    {/* Ternary for confirming login */}
                    {loginStatus ?
                        <p>{loginStatus ? `Logged in as user: ${currentUser.username}` : null}</p>
                        :
                        <>
                            <div className="loginInput">
                                <input type="text" placeholder="Username" onChange={(e) => handleUsername(e.target.value)} />
                            </div>
                            <div className="loginInput">
                                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="loginFooter">
                                <Button className="loginModalBtn" onClick={async () => signIn()}>
                                    {createBool ? "Create Account" : "Login"}
                                </Button>
                                <Button className="loginModalBtn" onClick={() => newUser()}>
                                    {createBool ? "Go to login" : "Create Account"}
                                </Button>
                            </div>
                        </>
                    }
                </Modal.Body>
                <Modal.Footer id="loginModalFooter"></Modal.Footer>
            </Modal>
        </>
    )
}
