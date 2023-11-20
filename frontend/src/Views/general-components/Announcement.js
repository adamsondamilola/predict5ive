import React, { Component, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



const Announcement = () =>{
    const [endPoint, setEndPoint] = useState(process.env.REACT_APP_MAIN_API)
    //const [announcementStoredId, setAnnouncementStoredId] = useState(localStorage.getItem('announcementId'));
    const [announcement, setAnnouncement] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const closeAnnouncement = () =>{
      //  localStorage.setItem('announcementId', announcement.id)
        setShowModal(false)
      }

      const getAnnouncement = () => {
            fetch(process.env.REACT_APP_MAIN_API + 'user/announcement')
            .then((response) => response.json())
            .then((json) => {
                if (json.status === 1) {
                  setAnnouncement(json.message)
                  setShowModal(true)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => console.log("done"));
      }

      useEffect(()=>{
        
        getAnnouncement();

    }, [])

      const announcementModal = <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
      >
      <Modal show={true} onHide={false}>
        <Modal.Header onClick={()=>closeAnnouncement()} closeButton>
          <Modal.Title>{announcement.subject}</Modal.Title>
        </Modal.Header>
      
        <Modal.Body>
          <p>{announcement.message}</p>
        </Modal.Body>
      
        <Modal.Footer>
          <Button onClick={()=>closeAnnouncement()} variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
      </div>

      return(
        <>
        {showModal?announcementModal : ''}
        </>
        )
}

export default Announcement