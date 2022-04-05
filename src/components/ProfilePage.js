import React, { useContext, useState, useEffect } from 'react'
import Banner from './Banner.js';
import UserContext from '../context/UserContext.js';
import Button from 'react-bootstrap/Button'
import { GetBuildsByUserId, GetCommentsByUserId, GetSavedBuildsByUserId, GetSavedBuildsById, GetSavedBuilds, GetUserById } from '../Services/apiService.js';
import BuildCard from './BuildCard.js';

export default function ProfilePage() {

  const { currentUser, setUser, savedBuildsData, setSavedData } = useContext(UserContext);

  const [buildData, setBuilds] = useState();
  const [commentData, setComments] = useState();
  
  useEffect(() => {
    if(currentUser != null){
      setSavedData(GetSavedBuilds());
      getData();
    }else if (localStorage.getItem('UserId') != null){
      getDataFromStorage();
    }
  }, [currentUser])
  
  
  const getData = async() => {
    setBuilds(await GetBuildsByUserId(currentUser.id));
    setComments(await GetCommentsByUserId(currentUser.id));
  }

  const getDataFromStorage = async() => {
    let user = await GetUserById(localStorage.getItem('UserId'));
    setUser(user);
    setBuilds(await GetBuildsByUserId(localStorage.getItem('UserId')));
    setComments(await GetCommentsByUserId(localStorage.getItem('UserId')));
  }

  const logout = () => {
    localStorage.removeItem('UserId');
    localStorage.removeItem('Username');
    localStorage.removeItem('loginToken');
    //Alert the user of logging out 
  }

  return (
    <>
      {/* Banner */}
      {currentUser === null ?
        <Banner title="PLEASE SIGN IN TO SEE PROFILE PAGE INFO -------->" />
        :
        <Banner title={`${currentUser.username}'s Profile`} />
      }
      <div className="Container">
        {/* Theme Settings & Logout */}
        <div className="themeContainer">
          <div id="logoutBtnBox">
            <a href="/">
              <Button id="logoutBtn" onClick={() => logout()}>Logout</Button>
            </a>
          </div>
        </div>

        {/* Saved Builds */}
        <div id="savedContainer">
          <h3 className="profileTitle">Saved Builds</h3>
          {/* Load Saved Builds here */}
          <div className="profileBuildContainer">
            {
              savedBuildsData === undefined || savedBuildsData.length === 0
              ?
              <p>No builds have been saved.</p>
              :
              savedBuildsData.map((build, index) => {
                return (
                  <BuildCard buildInfo={build} key={index} saved={true} />
                )
              })
            }
          </div>
        </div>

        {/* Uploaded Builds */}
        <div id='uploadedContainer'>
          <h3 className="profileTitle">My Builds</h3>
          {/* Load User Builds Here */}
          <div className="profileBuildContainer">
            {
              buildData === undefined || buildData.length === 0
                ?
                <p>This is where your builds would show up!</p>
                :
                buildData.map((build, index) => {
                  return (
                    <BuildCard buildInfo={build} key={index} />
                  )
                })
            }
          </div>
        </div>

        {/* Comments */}
        <div id="commentContainer">
          <h3 className="profileTitle">My Comments</h3>
          {/* Load User Comments Here */}
          <div id="uploadedComments">
            {
              commentData === undefined || commentData.length === 0
                ?
                <p>You haven't made any comments!</p>
                :
                commentData.map((comment, index) => {
                  return (
                    <div className="profileComment" key={index}>
                      <p>Comment: {comment.comment}</p>
                      <p>Date: {comment.uploadDate}</p>
                    </div>
                  )
                })
            }
          </div>
        </div>
      </div>
    </>
  )
}
