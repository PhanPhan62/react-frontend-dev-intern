import React, { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Alert, Container } from "react-bootstrap";

const PrivateRoute = (props) => {
  const [show, setShow] = useState(false);

  const { user } = useContext(UserContext);
  if (user && !user.auth) {
    return (
      <>
        <Container>
          <Alert variant="danger" className="mt-3">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>Mày chưa đăng nhập mà đòi à</p>
          </Alert>
        </Container>
      </>
    );
  }
  return <>{props.children}</>;
};

export default PrivateRoute;
