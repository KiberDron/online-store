import React from "react";
import { Modal } from "react-bootstrap";

const HelpAuth = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Данные для входа
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Чтобы протестировать возможности авторизованного пользователя,
          перейдите на страницу авторизации и войдите со следующими данными:
        </p>
        <p>
          email: user@example.com <br /> пароль: 123
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default HelpAuth;
