import React, { useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import { BsFillPersonFill } from "react-icons/bs";
import { connect, useDispatch } from "react-redux";
import {
  showModal,
  showRegisterModal,
} from "../../store/actions/auth/authActions";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import "../../css/landing/navbar.css";
import store from "../../store/store";
import { loadUser } from "../../store/actions/auth/authActions";
// import { User } from "../../store/actions/types";

const MyNavbar: React.FC = (props: any) => {
  const dispatch = useDispatch();

  const showLoginForm = () => {
    dispatch(showModal());
  };
  const showRegisterForm = () => {
    dispatch(showRegisterModal());
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(loadUser());
    };
    fetchData();
  }, []);

  let navBar = null;
  if (props.auth.user) {
    navBar = <>Welcome {props.auth.user?.username}</>;
  } else {
    navBar = (
      <>
        <Button id="sign-up" className="custom-btn" onClick={showRegisterForm}>
          Sign Up
        </Button>
        <Button id="log-in" className="custom-btn" onClick={showLoginForm}>
          Log In
        </Button>
      </>
    );
  }

  return (
    <>
      <LoginForm />
      <RegisterForm />
      <Navbar collapseOnSelect expand="md" id="header">
        <Container>
          <Navbar.Brand></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <BsFillPersonFill />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Container></Container>
            <Nav className="align-nav">{navBar}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(MyNavbar);
