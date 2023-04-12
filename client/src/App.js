import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { Spinner } from "react-bootstrap";
import { check } from "./http/userAPI";
import Help from "./components/Help";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(data);
        user.setIsAuth(true);
      })
      .finally(() => setLoading(false));
  });

  if (loading) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="d-flex justify-content-center align-items-center">
          <strong className="me-2">Загрузка...</strong>
          <Spinner variant="primary" animation="border" />
        </div>
        <p className="mt-2">
          Это может занять некоторое время (обычно не более 30 секунд)
        </p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="sticky-top">
        <NavBar />
      </div>
      <AppRouter />
      {!user.isAuth && <Help />}
    </BrowserRouter>
  );
});

export default App;
