import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";
import Pages from "../components/Pages";
import SortBy from "../components/SortBy";

const Shop = observer(() => {
  const { device } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, []);

  useEffect(() => {
    fetchDevices(
      device.selectedType.id,
      device.selectedBrand.id,
      device.page,
      device.limit,
      device.orderCol,
      device.orderType
    ).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [
    device.page,
    device.selectedType,
    device.selectedBrand,
    device.orderCol,
    device.orderType,
  ]);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <div className="d-flex align-items-center justify-content-between">
            <BrandBar />
            <SortBy />
          </div>
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
