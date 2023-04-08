import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "../index";
import { Dropdown } from "react-bootstrap";

const SortBy = observer(() => {
  const { device } = useContext(Context);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Сортировать по
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => {
            device.setOrderCol("name");
            device.setOrderType("ASC");
          }}
        >
          имени
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            device.setOrderCol("rating");
            device.setOrderType("DESC");
          }}
        >
          рейтингу
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            device.setOrderCol("price");
            device.setOrderType("ASC");
          }}
        >
          возрастанию цены
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            device.setOrderCol("price");
            device.setOrderType("DESC");
          }}
        >
          убыванию цены
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
});

export default SortBy;
