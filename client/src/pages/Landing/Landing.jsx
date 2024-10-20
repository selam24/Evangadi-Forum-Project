import React, { useState } from "react";
import classes from "./landing.module.css";
import Login from "../../Components/Login/Login";
import SignUp from "../../Components/SignUp/SignUp";
import About from "../../Components/About/About";
function Landing() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.inner__container}>
          {show ? (
            <SignUp visible={{ show, setShow }} />
          ) : (
            <Login visible={{ show, setShow }} />
          )}
          <About />
        </div>
      </div>
    </div>
  );
}

export default Landing;
