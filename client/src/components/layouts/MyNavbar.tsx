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

const MyNavbar: React.FC = () => {
  const dispatch = useDispatch();

  const showLoginForm = () => {
    dispatch(showModal());
  };
  const showRegisterForm = () => {
    dispatch(showRegisterModal());
  };
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
            <Nav className="align-nav">
              <Button
                id="sign-up"
                className="custom-btn"
                onClick={showRegisterForm}
              >
                Sign Up
              </Button>
              <Button
                id="log-in"
                className="custom-btn"
                onClick={showLoginForm}
              >
                Log In
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;
