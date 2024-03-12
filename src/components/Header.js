import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const Header = (props) => {
  // const [hideHeader, setKideHeader] = useState(false);

  // useEffect(() => {
  //   if (window.location.pathname === "/ogin") {
  //     setKideHeader(true);
  //   }
  // }, []);
  const navigate = useNavigate();

  const { logout, user } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    // localStorage.removeItem("token");
    navigate("/");
    toast.success("Đăng xuất thành công");
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="35"
              height="35"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            <span>React-Phan-Công</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <>
              <Nav className="me-auto">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
                <NavLink className="nav-link" to="/users">
                  Manager Users
                </NavLink>
              </Nav>

              <Nav>
                {user && user.email && (
                  <span className="nav-link">Chào mừng, {user.email}</span>
                )}

                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  {user && user.auth ? (
                    <NavDropdown.Item onClick={() => handleLogout()}>
                      Logout
                    </NavDropdown.Item>
                  ) : (
                    <NavLink className="dropdown-item" to="/login">
                      Login
                    </NavLink>
                  )}

                  {/* <NavDropdown.Divider /> */}
                </NavDropdown>
              </Nav>
            </>
            {(user && user.auth) || (window.location.pathname === "/" && <></>)}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
