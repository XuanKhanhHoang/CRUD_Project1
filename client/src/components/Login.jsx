import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { checkValidEmail } from "../utils/checkFormValid";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginRedux } from "../redux/actions/userAction";
import { english } from "../language/english";
import { vietnamese } from "../language/vietnamese";
import { CLEAR_ALL_KEYWORD_AND_FIELD_SEARCH } from "../redux/actions/manageUserAction";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMe, setIsRememberMe] = useState(true);
  const [validInfo, setValidInfo] = useState({
    email: undefined,
    password: undefined,
  });
  const [check, setCheck] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const isLoading = useSelector((state) => state.user.isLoading);
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    if (event.target.name === "loginEmailInp") {
      setEmail(event.target.value);
    } else if (event.target.name === "loginPasswordlInp") {
      setPassword(event.target.value);
    }
  };
  const rememberMe = (email, password) => {
    document.cookie = "";
    const cookieEmail = `email=${email}`;
    const cookiePassword = `password=${password}`;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);
    document.cookie = `${cookieEmail}; expires=${expirationDate.toUTCString()}`;
    document.cookie = `${cookiePassword}; expires=${expirationDate.toUTCString()}`;
  };
  const handleSubmitLogin = async () => {
    setCheck(true);
    if (checkValidEmail(email) && password !== "" && isLoading === false) {
      if (isRememberMe) {
        rememberMe(email, password);
      }
      dispatch({ type: CLEAR_ALL_KEYWORD_AND_FIELD_SEARCH });
      dispatch(handleLoginRedux(email, password));
    }
  };
  useEffect(() => {
    if (check)
      setValidInfo({
        email: checkValidEmail(email),
        password: password !== "",
      });
  }, [email, password, check]);
  useEffect(() => {
    if (account && account.auth) {
      navigate("/manage");
    }
  }, [account, navigate]);
  useEffect(() => {
    const emailCookie = document.cookie.match(/email=([^;]+)/);
    const passwordCookie = document.cookie.match(/password=([^;]+)/);
    if (emailCookie) {
      setEmail(emailCookie[1]);
    }
    if (passwordCookie) {
      setPassword(passwordCookie[1]);
    }
  }, []);
  const isViLanguage = useSelector((state) => state.language.isViLanguage);
  const viLanguage = vietnamese.login;
  const enLanguage = english.login;
  return (
    <>
      <Container className="mt-3 mainBody">
        <Form style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
            <Form.Label column className="text-center text-md-start" sm={3}>
              {isViLanguage ? viLanguage.email : enLanguage.email}
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="email"
                name="loginEmailInp"
                value={email}
                onChange={handleInputChange}
                placeholder="Enter email"
                style={{
                  border:
                    check && validInfo.email === false && "2px solid #d98a8a",
                }}
              />
            </Col>
            {check && validInfo.email === false && (
              <div
                className="col-12 text-center"
                style={{
                  fontSize: "15px",
                  color: "#d98a8a",
                }}
              >
                {isViLanguage
                  ? viLanguage.email_invalid
                  : enLanguage.email_invalid}
              </div>
            )}
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
            <Form.Label className=" text-center text-md-start" column sm={3}>
              {isViLanguage ? viLanguage.password : enLanguage.password}
            </Form.Label>
            <Col sm={8} style={{ position: "relative" }}>
              <input
                className="form-control "
                type={showPwd ? "text" : "password"}
                placeholder="Password"
                name="loginPasswordlInp"
                value={password}
                onChange={handleInputChange}
                style={{
                  border:
                    check &&
                    validInfo.password === false &&
                    "2px solid #d98a8a",
                }}
              ></input>
              <i
                className={
                  `fa-regular showHidePwdLogin  fa-eye` +
                  (showPwd ? "" : "-slash")
                }
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  marginRight: "12px",
                  padding: "11px 12px",
                  cursor: "pointer",
                }}
                onClick={() => setShowPwd(!showPwd)}
              ></i>
            </Col>
            {check && validInfo.password === false && (
              <div
                className="col-12 text-center"
                style={{
                  fontSize: "15px",
                  color: "#d98a8a",
                }}
              >
                {isViLanguage
                  ? viLanguage.password_Invalid
                  : enLanguage.password_Invalid}
              </div>
            )}
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex justify-content-center"
            controlId="formBasicCheckbox"
          >
            <label
              className="form-check-label me-3 text-center"
              htmlFor="rememberMeLoginCkBox"
            >
              {isViLanguage ? viLanguage.remeberMe : enLanguage.remeberMe} :
            </label>
            <input
              className="form-check-input"
              id="rememberMeLoginCkBox"
              type="checkbox"
              checked={isRememberMe}
              onChange={() => {
                setIsRememberMe(!isRememberMe);
              }}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="button"
            id="loginBtnSubmit"
            onClick={handleSubmitLogin}
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            ) : isViLanguage ? (
              viLanguage.login
            ) : (
              enLanguage.login
            )}
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Login;
