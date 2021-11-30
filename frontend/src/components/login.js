import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../actions/auth";
import LoginLogoutBtn from "./shared/loginLogout";
import Wrapper from "./shared/wrapper";
import { required } from "../helper/validateInputs";

import "./loginRegister.css"

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      form.current.validateAll();
      if (checkBtn.current.context._errors.length === 0) {
        await dispatch(login(username, password));
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }; 

  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }

  return (
    <Wrapper>
      <LoginLogoutBtn />
      <div>
        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <Input
              type="text"
              placeholder="Username"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <Input
              type="password"
              placeholder="Password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="d-grid gap-2">
            <button className="btn btn-primary btn-block mt-2">
              <span>Login</span>
            </button>
            {loading && (
              <div className="row justify-content-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </Wrapper>
  );
};

export default Login;
