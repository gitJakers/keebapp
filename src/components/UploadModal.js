import React from 'react'
import { useState, useContext } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { InputGroup, Form } from 'react-bootstrap'
import { AddNewBuild, UploadImage } from '../Services/apiService.js';
import UserContext from '../context/UserContext.js';

export default function UploadModal() {
    const { currentUser } = useContext(UserContext);
    //Modal Functions
    const [showModal, setModal] = useState(false);
    const handleClose = () => setModal(false);
    const handleShow = () => {
        setDate(new Date());
        setModal(true)
    };
    const [uploading, setUploading] = useState(false);

    // Uploaded Info
    const [uploadDate, setDate] = useState();
    const [name, setName] = useState('');
    const [keycaps, setKeycaps] = useState('');
    const [switches, setSwitches] = useState('');
    const [pcb, setPcb] = useState('');
    const [plates, setPlates] = useState('');
    const [buildCase, setCase] = useState('');
    const [cables, setCables] = useState('');
    const [controller, setController] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState();

    //Build to be added to database
    const buildToAdd = {
        UploadDate: uploadDate,
        Name: name,
        Keycaps: keycaps,
        Switches: switches,
        Pcb: pcb,
        Plates: plates,
        Case: buildCase,
        Cables: cables,
        Controller: controller,
        Description: description
    }

    //Submit Function
    const addBuild = async () => {
        let formData = new FormData();
        formData.append(name, file);
        setUploading(true);
        const uploadData = await AddNewBuild(buildToAdd, currentUser.id);
        const uploadImageData = await UploadImage(formData, name);
        if(!uploadData){
            console.log("Build already exists with that name. Please try again") // ALerts
        } else {
            console.log("Build uploaded successfully") // Alerts
        }
        setUploading(false);
    };

    const handleImage = async(e) => {
        // console.log(e);
        setFile(e.target.files[0])
    }

    return (
        <>
            <Button variant="primary" onClick={() => handleShow()}>Upload A Build</Button>
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Build Uploader</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {uploading ?
                        <h1>Uploading Build, please wait...</h1>
                        :
                        <>
                            <input type="file" accept='image/png, image/jpg, image/jpeg' onChange={handleImage} />
                            <InputGroup>
                                <InputGroup.Text>Name</InputGroup.Text>
                                <Form.Control type="text" onChange={(e) => setName(e.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a build name.
                                </Form.Control.Feedback>
                            </InputGroup>
                            {/* Keycaps */}
                            <InputGroup >
                                <InputGroup.Text>Keycaps</InputGroup.Text>
                                <Form.Control type="text" onChange={(e) => setKeycaps(e.target.value)} />
                            </InputGroup>
                            {/* Switches */}
                            <InputGroup>
                                <InputGroup.Text>Switches</InputGroup.Text>
                                <Form.Control type="text" onChange={(e) => setSwitches(e.target.value)} />
                            </InputGroup>
                            {/* Pcb */}
                            <InputGroup>
                                <InputGroup.Text>Pcb</InputGroup.Text>
                                <Form.Control type="text" onChange={(e) => setPcb(e.target.value)} />
                            </InputGroup>
                            {/* Plates */}
                            <InputGroup>
                                <InputGroup.Text>Plates</InputGroup.Text>
                                <Form.Control type="text" onChange={(e) => setPlates(e.target.value)} />
                            </InputGroup>
                            {/* Case */}
                            <InputGroup>
                                <InputGroup.Text>Case</InputGroup.Text>
                                <Form.Control type="text" onChange={(e) => setCase(e.target.value)} />
                            </InputGroup>
                            {/* Cables */}
                            <InputGroup>
                                <InputGroup.Text>Cables</InputGroup.Text>
                                <Form.Control type="text" onChange={(e) => setCables(e.target.value)} />
                            </InputGroup>
                            {/* Controller */}
                            <InputGroup>
                                <InputGroup.Text>Controller</InputGroup.Text>
                                <Form.Control type="text" onChange={(e) => setController(e.target.value)} />
                            </InputGroup>
                            {/* Description */}
                            <InputGroup>
                                <InputGroup.Text>Description</InputGroup.Text>
                                <Form.Control type="text" onChange={(e) => setDescription(e.target.value)} />
                            </InputGroup>
                        </>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={() => addBuild()}>
                        Add Build
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}