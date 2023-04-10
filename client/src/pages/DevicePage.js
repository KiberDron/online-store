import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import bigStar from "../assets/bigStar.png";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  fetchOneDevice,
  fetchRating,
  fetchUserRating,
  createRate,
  updateRate,
  updateDeviceRating,
  createBasketDevice,
} from "../http/deviceAPI";
import AddToBasket from "../components/modals/addToBasket";

const DevicePage = observer(() => {
  const [device, setDevice] = useState({ info: [] });
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [rateCount, setRateCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const { id } = useParams();
  const { user } = useContext(Context);

  const rates = [1, 2, 3, 4, 5];

  const addRating = (rate) => {
    if (userRating) {
      updateRate({ rate, userId: user.user.id, deviceId: id }).then((data) => {
        setUserRating(data.rate);
        fetchRating(id).then((data) =>
          updateDeviceRating({ id, rating: data.rating })
        );
      });
    } else {
      createRate({ rate, userId: user.user.id, deviceId: id }).then((data) => {
        setUserRating(data.rate);
        fetchRating(id).then((data) =>
          updateDeviceRating({ id, rating: data.rating })
        );
      });
    }
  };

  const rightSpelling = (count, word) => {
    if (
      (count % 10 === 2 || count % 10 === 3 || count % 10 === 4) &&
      count % 100 !== 12 &&
      count % 100 !== 13 &&
      count % 100 !== 14
    ) {
      return word + "ки";
    } else if (count % 10 === 1 && count % 100 !== 11) {
      return word + "ка";
    } else {
      return word + "ок";
    }
  };

  const addToBasket = () => {
    createBasketDevice({ deviceId: id, userId: user.user.id }).then((data) =>
      alert("Товар добавлен в корзину")
    );
  };

  useEffect(() => {
    fetchRating(id).then((data) => {
      setRating(data.rating);
      setRateCount(data.count);
    });
    if (user.isAuth) {
      fetchUserRating(user.user.id, id).then((data) =>
        setUserRating(data.rate)
      );
    }
  }, [userRating]);

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, [rating]);

  return (
    <Container className="mt-3">
      <h1>{device.name}</h1>
      <Row>
        <Col md={4}>
          {device.img ? (
            <Image
              width={300}
              height={300}
              src={process.env.REACT_APP_API_URL + device.img}
            />
          ) : null}
        </Col>
        <Col md={4}>
          <div className="d-flex flex-column">
            <Card
              className="d-flex flex-column align-items-center justify-content-around"
              style={{
                width: 300,
                height: 300,
                border: "5px solid lightgray",
              }}
            >
              <h5>
                {rateCount} {rightSpelling(rateCount, "оцен")} покупателей
              </h5>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  background: `url(${bigStar}) no-repeat center center`,
                  width: 240,
                  height: 240,
                  backgroundSize: "cover",
                  fontSize: 64,
                }}
              >
                {device.rating}
              </div>
            </Card>
            {user.isAuth && (
              <div className="mt-1">
                <h6>Ваша оценка:</h6>
                {rates.map((rate) => {
                  return rate <= userRating ? (
                    <StarIcon
                      key={rate}
                      style={{ cursor: "pointer", color: "gold" }}
                      onClick={() => addRating(rate)}
                    />
                  ) : (
                    <StarBorderIcon
                      key={rate}
                      style={{ cursor: "pointer", color: "gold" }}
                      onClick={() => addRating(rate)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              border: "5px solid lightgray",
            }}
          >
            <h3>Цена: {device.price} руб.</h3>
            {user.isAuth && (
              <Button
                onClick={() => setModalVisible(true)}
                variant={"outline-dark"}
              >
                Добавить в корзину
              </Button>
            )}
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h2>Характеристики</h2>
        {device.info.map((info, index) => (
          <Row
            key={info.id}
            style={{
              background: index % 2 ? "transparent" : "lightgray",
              padding: 10,
            }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
      <AddToBasket
        show={modalVisible}
        onHide={() => setModalVisible(false)}
        deviceId={id}
        price={device.price}
        userId={user.user.id}
      />
    </Container>
  );
});

export default DevicePage;
