import React from "react";
import "./wrapper.css"

const Wrapper = (props) => {
  return (
    <div className="wrapper-main container">
      <div className="row justify-content-center align-items-center mt-5">
        <div className="col-sm-10 col-lg-6 wrapper">{props.children}</div>
      </div>
    </div>
  );
};

export default Wrapper;
