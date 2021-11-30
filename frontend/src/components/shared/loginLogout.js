import React from "react";
import { NavLink } from "react-router-dom";

import "./loginLogout.css"

const LoginLogoutBtn = () => {
  return (
    <div className="row">
      <div className="col-6 btn-nav-l">
        <NavLink to="/login">
          <div className="d-grid gap-2">
            <button className="btn btn-primary btn-nav no-radius" type="button">
              <strong>LOGIN</strong>
            </button>
          </div>
        </NavLink>
      </div>
      <div className="col btn-nav-r">
        <NavLink to="/register">
          <div className="d-grid gap-2">
            <button className="btn btn-primary btn-nav no-radius" type="button">
            <strong>REGISTER</strong>
            </button>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default LoginLogoutBtn;
