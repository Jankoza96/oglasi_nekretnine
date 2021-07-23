import React from 'react';
import Form from './Form';

const Modal = (props) => {
    const {
        data,
        modalRef,
    } = props;

    return (
        <div ref={modalRef} className="modal">
            <div className="modal-content">
                <span className="close" onClick={props.closeModal}>&times;</span>
                <p><Form data={data} closeModal={props.closeModal}/></p>
            </div>
        </div>
    );
}

export default Modal;