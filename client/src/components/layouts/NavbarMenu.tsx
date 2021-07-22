import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import quizzoLogo from '../../assets/logo.svg';
import logoutIcon from '../../assets/logout.svg';
import { connect, useDispatch } from 'react-redux';
import { showModal, showRegisterModal } from '../../store/slices/auth.slice';
import { Link } from 'react-router-dom';
import store from '../../store/store';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';

const NavbarMenu: React.FC = () => {
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
      <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
        <Navbar.Brand className="font-weight-bolder text-white">
          <img
            src={quizzoLogo}
            alt="quizzoLogo"
            width="32"
            height="32"
            className="mr-2"
          />
          Quizzo
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              className="font-weight-bolder text-white"
              to="/landingPage"
              as={Link}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              className="font-weight-bolder text-white"
              to="/about"
              as={Link}
            >
              About
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link className="font-weight-bolder text-white" disabled>
              Welcome to Quizzo
            </Nav.Link>
            <Button
              variant="secondary"
              className="font-weight-bolder text-white"
              onClick={showLoginForm}
            >
              <img
                src={logoutIcon}
                alt="logoutIcon"
                width="32"
                height="32"
                className="mr-2"
              />
              LogIn
            </Button>
            <Button
              variant="secondary"
              className="font-weight-bolder text-white"
              onClick={showRegisterForm}
            >
              <img
                src={logoutIcon}
                alt="logoutIcon"
                width="32"
                height="32"
                className="mr-2"
              />
              Register
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default connect()(NavbarMenu);
