import React, { useState, useEffect, useContext } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import { GetUsernameByUserId, GetCommentsByBuildId, UploadComment } from '../Services/apiService.js';
import UserContext from '../context/UserContext.js';
import Alert from 'react-bootstrap/Alert'
import '../styles/ViewerStyles.css'

export default function BuildViewer({ build: buildData, buildPic: buildImage }) {

  const { currentUser } = useContext(UserContext);
  const [showModal, setModal] = useState(false);
  const handleClose = () => setModal(false);
  // const handleShow = () => {
  //   setModal(true)
  // };
  const [username, setUsername] = useState(null);
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [accordKey, setKey] = useState('0');
  const [alert, setAlert] = useState(false);

  useEffect(() => {

  })

  const handleView = async () => {
    setModal(true);
    const userName = await GetUsernameByUserId(buildData.userId);
    const buildComments = await GetCommentsByBuildId(buildData.id);
    setUsername(userName);
    setComments(buildComments);
  }

  const handleComment = async (commentValue) => {
    setNewComment(commentValue);
  }

  const handleCommentSubmit = async () => {
    // console.log("Comment to upload: ", newComment.length, buildData.id)
    if (currentUser === null) {
      // Alert Here
      console.log('You must sign in before you can upload comments');
    } else if (newComment.length === 0) {
      // Alert Here
      console.log("Please enter a comment before attempting to upload.")
    } else {
      await UploadComment(newComment, currentUser.id, buildData.id, currentUser.username)
      setComments(await GetCommentsByBuildId(buildData.id));
    }
  }

  return (

    <div>
      <Button variant="primary" onClick={() => handleView()}>
        View
      </Button>
      <Modal className="buildViewerModal" show={showModal} onHide={handleClose} centered>
        <div id="buildViewerImage">
          {/* Build Image */}
          {buildImage === null || buildImage.length <= 7000 ?
            <>
              <p>buildImage is null</p>
              {/* <img src={DustBunny} alt="" /> */}
            </>
            :
            <img src={buildImage} className="buildViewerImg" alt="" />
          }
        </div>
        <Accordion className="buildViewerAccordion" activeKey={accordKey} defaultActiveKey="0" flush>
          <Accordion.Item className="buildViewerDropdown" eventKey="0" onClick={() => setKey('0')}>
            <Accordion.Header>Build Info</Accordion.Header>
            <Accordion.Body className="buildViewerBody">
              <h4>{buildData.name}</h4>
              {
                username === null ?
                  <p>Spinner Here</p>
                  :
                  <h4>Uploaded By: {username}</h4>
              }
              <p>Uploaded: {buildData.uploadDate}</p>
              <p>Keycaps: {buildData.keycaps}</p>
              <p>Switches: {buildData.switches}</p>
              <p>Pcb: {buildData.pcb}</p>
              <p>Plates: {buildData.plates}</p>
              <p>Case: {buildData.case}</p>
              <p>Cables: {buildData.cables}</p>
              <p>Controller: {buildData.controller}</p>
              <p>Description: {buildData.description}</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item className="buildViewerDropdown" eventKey="1" onClick={() => setKey('1')}>
            <Accordion.Header>Comments</Accordion.Header>
            <Accordion.Body className="buildViewerBody">
              <input type="text" placeholder="Write a comment" onChange={(e) => handleComment(e.target.value)} /><Button onClick={handleCommentSubmit}>Add Comment</Button>
              {comments === null || comments.length <= 0 ?
                <p>No Comments</p>
                :
                comments.map((comment, index) => {
                  return (
                    <div key={index}>
                      <p>{comment.username}</p>
                      <p>{comment.comment}</p>
                      <p>{comment.uploadDate}</p>
                    </div>
                  )
                })
              }
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Modal>
    </div>

  )
}
