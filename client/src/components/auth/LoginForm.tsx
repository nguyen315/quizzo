import React, { useState, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import {
  showModal,
  showRegisterModal,
  loginUser
} from '../../store/slices/auth.slice';
import { connect } from 'react-redux';
import '../../css/auth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { AppDispatch } from '../../store/store';
import { Link, useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const LoginForm = (props: any) => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  const setShowModal = () => {
    dispatch(showModal());
  };

  const goToSignUp = () => {
    dispatch(showModal());
    dispatch(showRegisterModal());
  };

  const { username, password } = loginForm;

  const onChangeLoginForm = (e: any) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const resetFormLogin = () => {
    setLoginForm({ username: '', password: '' });
    setShowModal();
  };

  const login = async (event: any) => {
    event.preventDefault();
    try {
      const responseData = await dispatch(loginUser(loginForm));
      // responseData have field .payload.success
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        className="Auth-Modal"
        show={auth.showModal}
        onHide={resetFormLogin}
      >
        <Modal.Header className="Auth-Modal_header" closeButton>
          <Modal.Title className="Auth-Modal_title">Log In</Modal.Title>
        </Modal.Header>
        <Form onSubmit={login}>
          <Modal.Body>
            <Form.Group className="groupInput">
              <Form.Label className="iconInput">
                <FontAwesomeIcon icon={faUser} />
              </Form.Label>
              <Form.Control
                className="Auth-Modal_input"
                type="text"
                placeholder="Username"
                name="username"
                required
                aria-describedby="title-help"
                value={username}
                onChange={onChangeLoginForm}
              />
            </Form.Group>

            <Form.Group className="groupInput">
              <Form.Label className="iconInput">
                <FontAwesomeIcon icon={faUnlockAlt} />
              </Form.Label>
              <Form.Control
                className="Auth-Modal_input"
                type="password"
                placeholder="********"
                name="password"
                value={password}
                onChange={onChangeLoginForm}
              />
            </Form.Group>
            <Form.Text to="/forgotPassword" as={Link} className="forgot-pass">
              Forgot <span className="hightLightText">password</span>
            </Form.Text>
            <div className="Auth-Modal_button">
              <Button className="" variant="primary" type="submit">
                Login
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Form.Text
              className="Auth-Modal_footer forgot-pass"
              to="/"
              as={Link}
              onClick={goToSignUp}
            >
              New here? <span className="hightLightText">Sign Up</span>
            </Form.Text>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default LoginForm;
