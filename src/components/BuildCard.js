import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import DustBunny from '../assets/Dust Bunny.png';
import Button from 'react-bootstrap/Button'
import { SaveBuild, UnsaveBuild, GetSavedBuildsByUserId, GetSavedBuildsById, GetSavedBuilds } from '../Services/apiService.js';
import UserContext from '../context/UserContext.js';
import BuildViewer from '../components/BuildViewer.js';

export default function BuildCard({ buildInfo: build }) {

    const { currentUser, savedBuildsData, setSavedData } = useContext(UserContext);
    const [buildImage, setImage] = useState(null);

    useEffect(async () => {
        await handleGet();
    }, [])

    const handleGet = async () => { //Change this to url 
        let res = await fetch(`http://localhost:5196/Builds/GetImageByName/${build.name}`);
        let data = await res.arrayBuffer();
        let newB = new Blob([data], { type: 'image/jpeg' })
        let file = new File([newB], build.name, { type: 'image/jpeg' })
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    }

    const saveBuild = async (build) => {
        console.log("Favorite: ", build, currentUser.id)
        if (currentUser.id !== build.userId) {
            const result = SaveBuild(currentUser.id, build.id);
            const savedArr = await GetSavedBuildsByUserId(currentUser.id);
            await GetSavedBuildsById(savedArr);
            console.log(result);
        } else {
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
                    console.log('build successfully removed from saved.')
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
        <Card className="buildCard">
            <Card.Img className="buildCardImg" variant="top" src={buildImage === null || buildImage.length <= 7000 ? DustBunny : buildImage} alt="Dust Bunny" title="Placeholder Dust Bunny" />
            {/* Still need a way to reload the page when saved / unsaved */}
            {
                savedBuildsData === undefined ? null : //Prevent erroring when loading
                    currentUser.id === build.userId ? null : // Prevent user from saving their own builds
                    savedBuildsData.some((savedBuild) => savedBuild.id === build.id) ?
                        <Button className="saveBtn" onClick={() => unsaveBuild(build)}>unsave</Button>
                        :
                        <Button className="saveBtn" onClick={() => saveBuild(build)}>save</Button>
            }
            <Card.Body>
                <Card.Title>{build.name}</Card.Title>
                <BuildViewer build={build} buildPic={buildImage} /> {/* Floppy Disk Icon Here */}
            </Card.Body>
        </Card>
    )
}
