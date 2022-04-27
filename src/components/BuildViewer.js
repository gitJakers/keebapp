import React, { useState, useEffect, useContext } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import { GetUsernameByUserId, GetCommentsByBuildId, UploadComment } from '../Services/apiService.js';
import UserContext from '../context/UserContext.js';
import Alert from 'react-bootstrap/Alert'
import '../styles/ViewerStyles.css'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

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
  const [showToast, setShow] = useState(false);
  const [toastMessage, setMessage] = useState("You must sign in to comment.");

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
    if (currentUser === null) {
      // Alert Here
      setShow(true);
      setMessage("You must sign in to comment.");
    } else if (newComment.length === 0) {
      // Alert Here
      setShow(true);
      setMessage("Please enter a comment before attempting to upload.");
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
              <p>No Build Image Uploaded</p>
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
                  <p>Loading...</p>
                  :
                  <h4>Uploaded By: {username}</h4>
              }
              <p><strong>Uploaded: </strong>{buildData.uploadDate}</p>
              <p><strong>Keycaps: </strong>{buildData.keycaps}</p>
              <p><strong>Switches: </strong>{buildData.switches}</p>
              <p><strong>Pcb: </strong>{buildData.pcb}</p>
              <p><strong>Plates: </strong>{buildData.plates}</p>
              <p><strong>Case: </strong>{buildData.case}</p>
              <p><strong>Cables: </strong>{buildData.cables}</p>
              <p><strong>Controller: </strong>{buildData.controller}</p>
              <p><strong>Description: </strong>{buildData.description}</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item className="buildViewerDropdown" eventKey="1" onClick={() => setKey('1')}>
            <Accordion.Header>Comments</Accordion.Header>
            <Accordion.Body className="buildViewerBody">
              <div className="commentRow">
              <input className="commentBox" type="text" placeholder="Write a comment" onChange={(e) => handleComment(e.target.value)} /><Button className="commentSubmitBtn" onClick={handleCommentSubmit}>Submit</Button>
              </div>
              {comments === null || comments.length <= 0 ?
                <p>No Comments</p>
                :
                comments.map((comment, index) => {
                  return (
                    <div key={index}>
                      <strong>{comment.username}</strong><span> {comment.uploadDate}</span>
                      <p>{comment.comment}</p>
                    </div>
                  )
                })
              }
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      <ToastContainer className="toastAlert" position="middle-center">
        <Toast bg='danger' show={showToast} onClose={() => setShow(false)}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Comment Status</strong>
          </Toast.Header>
          <Toast.Body className='text-white'>Comment Failed To Upload: {toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
      </Modal>
    </div>

  )
}
