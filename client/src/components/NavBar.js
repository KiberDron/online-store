import React, { useContext } from "react";
import { Context } from "../index";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
  BASKET_ROUTE,
} from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const NavBar = observer(() => {
  const { user, device } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem("token");
  };

  return (
    <Navbar bg="primary" variant="light">
      <Container>
        <NavLink
          className="fw-bold"
          style={{ color: "white", textDecoration: "none" }}
          to={SHOP_ROUTE}
        >
          📱 Device Store
        </NavLink>
        {user.isAuth ? (
          <Nav className="d-flex align-items-center" style={{ color: "white" }}>
            {user.user.role === "ADMIN" && (
              <Button
                variant={"outline-light"}
                onClick={() => navigate(ADMIN_ROUTE)}
              >
                Админ панель
              </Button>
            )}
            <ShoppingCartIcon
              onClick={() => navigate(BASKET_ROUTE)}
              className="ms-3"
              style={{ cursor: "pointer" }}
            />
            <span>{device.basketCount || ""}</span>
            <Button
              variant={"outline-light"}
              onClick={() => logOut()}
              className="ms-3"
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ms-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
