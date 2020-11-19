import React, { useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';

const AppModal = (props) => {
  const { className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className={`app-modal ${className}`}>
      <Button color={props.btnColor} onClick={toggle}>
        <i className={`fas ${props.icon} fa-1x`}></i> {props.title}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className='modal-dialog-centered modal-lg'>
      <ModalHeader toggle={toggle}>{props.title}</ModalHeader>
        <ModalBody>{props.children}</ModalBody>
      </Modal>
    </div>
  );
};

export default AppModal;
