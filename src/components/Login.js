import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../login.css";
import { loginAPI } from "../service/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();

  const { loginContext } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setisShowPassword] = useState(false);
  const [loadingAPI, setLoadingAPi] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email hoặc Password trống");
      return;
    }
    setLoadingAPi(true);
    let res = await loginAPI(email, password);
    // console.log(res);

    if (res && res.token) {
      loginContext(email, res.token);
      toast.success("Đăng nhập thành công");

      navigate("/");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setLoadingAPi(false);
  };

  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <>
      <Container>
        <div className="login-container col-12 col-sm-4">
          <div className="title">Log in</div>
          <div className="text">Email or Username (eve.holt@reqres.in)</div>
          <input
            className="input"
            type="text"
            placeholder="Email or Username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoFocus
          />
          <div className="input-eye">
            <input
              className="input"
              type={isShowPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <i
              className={
                isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
              }
              onClick={() => setisShowPassword(!isShowPassword)}
            ></i>
          </div>

          <button
            className={email && password ? "button active-button" : "button"}
            disabled={email && password ? false : true}
            onClick={() => handleLogin()}
          >
            {loadingAPI && <i className="fas fa-spinner fa-pulse"></i>} Login
          </button>
          <div className="back">
            <span onClick={() => handleGoBack()}>
              <i className="fa-solid fa-angles-left"></i> Go back
            </span>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
