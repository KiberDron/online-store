import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { Card } from "react-bootstrap";

const BrandBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <div className="d-flex flex-wrap">
      {device.brands.map((brand) => (
        <Card
          key={brand.id}
          className="p-3"
          style={{ cursor: "pointer" }}
          border={brand.id === device.selectedBrand.id ? "primary" : "light"}
          onClick={() => {
            if (brand.id === device.selectedBrand.id) {
              device.setSelectedBrand({});
            } else {
              device.setSelectedBrand(brand);
            }
          }}
        >
          {brand.name}
        </Card>
      ))}
    </div>
  );
});

export default BrandBar;
