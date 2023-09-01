import React, { useRef } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authorization } from "../services/UserServices";
import { useEffect } from "react";
import { useState } from "react";
import useAuth from "../customHooks/useAuth";
import { USER_LOGOUT, USER_SESSION_VALID } from "../redux/actions/userAction";
import { toast } from "react-toastify";
const PrivateRoutes = () => {
  const dispatch = useDispatch();
  const [isAuth, isLoading] = useAuth();
  useEffect(() => {
    const token = localStorage.getItem("token") || false;
    // console.log("priv run", token);
    if (isAuth === false)
      if (token === false) {
        // console.log("priv run kk");
        toast.error("You not login yet , please to login !");
      } else {
        // console.log("priv runff", token);
        dispatch({ type: USER_SESSION_VALID });
      }
  }, [dispatch, isAuth]);
  if (isLoading) return <div style={{ textAlign: "center" }}>Loading</div>;
  if (!isAuth) {
    return <Navigate to="/login" />;
  } else return <Outlet />;
};

export default PrivateRoutes;
