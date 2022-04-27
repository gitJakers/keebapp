import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import DustBunny from '../assets/Dust Bunny.png';
import Button from 'react-bootstrap/Button'
import { SaveBuild, UnsaveBuild, GetSavedBuildsByUserId, GetSavedBuildsById, GetSavedBuilds } from '../Services/apiService.js';
import UserContext from '../context/UserContext.js';
import BuildViewer from '../components/BuildViewer.js';
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faGear } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOut } from '@fortawesome/free-regular-svg-icons';

export default function BuildCard({ buildInfo: build }) {

    const { currentUser, savedBuildsData, setSavedData } = useContext(UserContext);
    const [buildImage, setImage] = useState(null);
    const [showToast, setShow] = useState(false);
    const [toastStatus, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toastMessage, setMessage] = useState("Build Added to Saved Builds.");

    useEffect(async () => {
        await handleGet();
    }, [])

    const handleGet = async () => { //Change this to url 
        setLoading(true);
        //https://keyboardapi.azurewebsites.net/
        //http://localhost:5196/
        let res = await fetch(`https://keyboardapi.azurewebsites.net/Builds/GetImageByName/${build.name}`);
        let data = await res.arrayBuffer();
        let newB = new Blob([data], { type: 'image/jpeg' })
        let file = new File([newB], build.name, { type: 'image/jpeg' })
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
        setLoading(false);
    }
    const saveBuild = async (build) => {
        console.log("Favorite: ", build, currentUser.id)
        if (currentUser.id !== build.userId) {
            const result = SaveBuild(currentUser.id, build.id);
            const savedArr = await GetSavedBuildsByUserId(currentUser.id);
            await GetSavedBuildsById(savedArr);
            setStatus(false);
            setMessage("Build Added to Saved Builds.");
            setShow(true);
            console.log(result);
        } else {
            setStatus(true);
            setShow(true);
            console.log("Build Not saved");
        }
    }
    const unsaveBuild = async (build) => {
        console.log("unsave this: ", build);
        const savedBuildsArray = await GetSavedBuildsByUserId(currentUser.id);
        let buildToUnsave = {};
        savedBuildsArray.map(savedBuild => {
            if (savedBuild.buildId === build.id) {
                console.log("Found build in the saved builds table: ", build);
                buildToUnsave = savedBuild;
                console.log(buildToUnsave);
                if (UnsaveBuild(buildToUnsave)) {
                    setStatus(false);
                    setMessage("Build Removed From Saved. Refresh to see changes."); //Alert
                    setShow(true);
                    // loadSavedBuilds();
                }
            }
        })
    }

    const loadSavedBuilds = async () => {
        const savedArr = await GetSavedBuildsByUserId(currentUser.id);
        await GetSavedBuildsById(savedArr);
        setSavedData(GetSavedBuilds());
    }

    return (
        <>
            <Card className="buildCard">
                {/* <Card.Img className="buildCardImg" variant="top" src={buildImage} alt="Dust Bunny" title="Placeholder Dust Bunny" /> */}
                {loading ?
                    <div className="buildCardImg">
                    <FontAwesomeIcon className="fa-spin fa-4x buildCardGear" icon={faGear} />
                    </div>
                    :
                    <Card.Img className="buildCardImg" variant="top" src={buildImage} alt={build.name} title={build.name} />
                }
                {/* Still need a way to reload the page when saved / unsaved */}
                {
                    savedBuildsData === undefined ? null : //Prevent erroring when loading
                        currentUser.id === build.userId ? null : // Prevent user from saving their own builds
                            savedBuildsData.some((savedBuild) => savedBuild.id === build.id) ?
                                <Button className="saveBtn" onClick={() => unsaveBuild(build)}>Unfollow</Button>
                                // <FontAwesomeIcon className="fa-1x saveBtn" title="Unfollow Build" alt="Unfollow build" icon={faHeartOut} onClick={() => unsaveBuild(build)}/>
                                :
                                <Button className="saveBtn" onClick={() => saveBuild(build)}>Follow</Button>
                    // <FontAwesomeIcon className="fa-1x saveBtn" title="Follow Build" alt="Follow Build" icon={faHeart} onClick={() => saveBuild(build)}/>
                }
                <Card.Body>
                    {build == null || build == undefined ? null :
                        <>
                            <Card.Title className="buildTitle">
                                {build.name}
                            </Card.Title>
                            <BuildViewer build={build} buildPic={buildImage} /> {/* Floppy Disk Icon Here */}
                        </>
                    }
                </Card.Body>
            </Card>
            <ToastContainer className="toastAlert" position="top-end">
                {toastStatus ?
                    <Toast bg='danger' show={showToast} onClose={() => setShow(false)}>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Follow Status</strong>
                        </Toast.Header>
                        <Toast.Body className='text-white'>Build Not Followed.</Toast.Body>
                    </Toast>
                    :
                    <Toast bg='success' show={showToast} onClose={() => setShow(false)}>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Follow Status</strong>
                        </Toast.Header>
                        <Toast.Body className='text-white'>{toastMessage}</Toast.Body>
                    </Toast>
                }
            </ToastContainer>
        </>
    )
}
