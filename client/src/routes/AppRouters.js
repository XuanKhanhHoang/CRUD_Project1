import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Manage from "../components/Manage";
import Login from "../components/Login";
import Navigation from "../components/Navigation";
import PrivateRoutes from "./PrivateRoutes";
import AboutMe from "../components/About";
import PageNotFound from "../components/PageNotFound";
const AppRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="manage" element={<PrivateRoutes />}>
          <Route path=":page" element={<Manage />} />
          <Route path="" element={<Navigate to="./1" />} />
        </Route>
        <Route path="" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="about" element={<AboutMe />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRouters;
