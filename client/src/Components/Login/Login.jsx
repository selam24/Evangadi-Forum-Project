// Assigned to EDOimport { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Api/axios";
import classes from "./login.module.css"; // Import your CSS file
import { useContext, useRef, useState } from "react";
import { AppState } from "../../Context/DataContext";
import { BiHide, BiShow } from "react-icons/bi";
import { ClipLoader } from "react-spinners";
function SignIn({ visible }) {
  const { setShow } = visible;
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppState);
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const emailValue = emailRef.current.value.trim();
    const passwordValue = passwordRef.current.value;

    // Form validation
    if (!emailValue || !passwordValue) {
      setErrorMessage("Please provide all required information.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.username);
        navigate("/");
      }
    } catch (error) {
      setIsLoading(false);
      // console.log(error);
      if (error.response) {
        setErrorMessage(error.response.data.message || "Something went wrong!");
      } else {
        setErrorMessage("Network error. Please try again later.");
      }
    }
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className={classes.signIn_container}>
      <h1>Login to your account</h1>
      <p>
        Don't have an account?
        <Link
          class="lnk-toggler"
          data-panel="panel-signup"
          onClick={() => setShow(true)}
        >
          Create a new account?
        </Link>
      </p>
      {errorMessage && <p className={classes.error_message}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} className={classes.signIn_form}>
        <div className={classes.label_in}>
          {/* <label>Email: </label> */}
          <input
            ref={emailRef}
            type="email"
            placeholder="Enter your email"
            required
          />
          <div className={classes.password_field}>
            <input
              size="65"
              ref={passwordRef}
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={classes.toggle_password}
            >
              {showPassword ? (
                <BiShow size={20} color="#E58600" />
              ) : (
                <BiHide size={20} color="#E58600" />
              )}
            </button>
          </div>
        </div>

        <p className={classes.forgotPwd}>
          <Link className={classes.lnk_toggler} data-panel="panel-forgot" >
            Forgot password ?
          </Link>
        </p>
        <button className={classes.submit} type="submit">
          {isLoading ? <ClipLoader size={12} color="gray" /> : "Sign In"}
        </button>
      </form>
    </section>
  );
}

export default SignIn;
