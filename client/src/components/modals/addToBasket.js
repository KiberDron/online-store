import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createBasketDevice } from "../../http/deviceAPI";
import { Context } from "../../index";

const AddToBasket = ({ show, onHide, deviceId, price, userId }) => {
  const [count, setCount] = useState(1);
  const { device } = useContext(Context);

  const addDevice = (count) => {
    for (let i = 0; i < count; i++) {
      createBasketDevice({ deviceId, userId });
    }
    device.setBasketCount(device.basketCount + Number(count));
    setCount(1);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить в корзину
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Сколько товаров вы хотите добавить?</Form.Label>
          <Form.Control
            value={count}
            onChange={(e) => setCount(e.target.value)}
            type="number"
            min={1}
            step={1}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <p className="me-auto fw-bold">
          {count} × {price} = {count * price} руб.
        </p>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={() => addDevice(count)}>
          Подтвердить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddToBasket;
