import React, { useState } from 'react'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer'

export default function Toasts(props) {

    return (
        <>
            <ToastContainer className="toastAlert" position="top-end">
                <Toast bg='success' show={props.showToast} onClose={() => props.handleToast}>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Upload Status</strong>
                    </Toast.Header>
                    <Toast.Body className='text-white'>Build Successfully Uploaded!</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}
