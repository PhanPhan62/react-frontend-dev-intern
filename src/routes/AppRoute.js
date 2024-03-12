import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import PrivateRoute from "./PrivateRoute";
import TableUser from "../components/TableUser";

const AppRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/users"
          element={
            <PrivateRoute>
              <TableUser />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoute;
