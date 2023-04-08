import React, { useContext } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import CancelIcon from '@mui/icons-material/Cancel';
import { Context } from "../index";
import { deleteBasketDevice } from "../http/deviceAPI";

const DeviceItem = ({ deviceItem }) => {
  const navigate = useNavigate();
  const {user, device} = useContext(Context)

  const deleteDevice = () => {
    deleteBasketDevice(deviceItem.id, user.user.id).then((data) =>
      device.setBasketDevices(
        device.basketDevices.filter((device) => device.id !== deviceItem.id)
      )
    );
  };

  // return (
  //   <div className="d-flex justify-content-between" >
  //     <Image
  //       onClick={() => navigate(DEVICE_ROUTE + "/" + deviceItem.id)}
  //       src={process.env.REACT_APP_API_URL + deviceItem.img}
  //       width={100}
  //       height={100}
  //       style={{cursor: 'pointer'}}
  //     />
  //     <div className="">
  //       <p className="fw-bold">{deviceItem.name}</p>
  //       <p>Количество: {deviceItem.count}</p>
  //     </div>
  //     <p>{deviceItem.price * deviceItem.count} руб.</p>
  //     <CancelIcon onClick={deleteDevice} style={{cursor: 'pointer'}} />
  //   </div>
  // );

  return (
    <Row md={4}>
      <Col md={2}>
        <Image
          onClick={() => navigate(DEVICE_ROUTE + "/" + deviceItem.id)}
          src={process.env.REACT_APP_API_URL + deviceItem.img}
          width={100}
          height={100}
          style={{cursor: 'pointer'}}
        />
      </Col>
      <Col md={5}>
        <p className="fw-bold">{deviceItem.name}</p>
        <p>Количество: {deviceItem.count}</p>
      </Col>
      <Col md={2}>
        <p>{deviceItem.price * deviceItem.count} руб.</p>
      </Col>
      <Col className="d-flex">
        <CancelIcon className="ms-auto" onClick={deleteDevice} style={{cursor: 'pointer'}} />
      </Col>
    </Row>
  );
};

export default DeviceItem;
