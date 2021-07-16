import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import {
  showRegisterModal,
  registerUser,
} from "../../store/actions/auth/authActions";
import { connect } from "react-redux";
import "../../css/auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUnlockAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const RegisterForm: React.FC = (props: any) => {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const setShowModal = () => {
    dispatch(showRegisterModal());
  };

  const { username, password, email, confirmPassword } = registerForm;

  const onChangeRegisterForm = (e: any) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const resetFormRegister = () => {
    setRegisterForm({
      username: "",
      password: "",
      email: "",
      confirmPassword: "",
    });
    setShowModal();
  };

  const register = async (event: any) => {
    event.preventDefault();
    try {
      dispatch(registerUser(registerForm));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        className="Auth-Modal"
        show={props.auth.showRegisterModal}
        onHide={resetFormRegister}
      >
        <Modal.Header className="Auth-Modal_header" closeButton>
          <Modal.Title className="Auth-Modal_title">Sign Up</Modal.Title>
        </Modal.Header>
        <Form onSubmit={register}>
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
                onChange={onChangeRegisterForm}
              />
            </Form.Group>
            <Form.Group className="groupInput">
              <Form.Label className="iconInput">
                <FontAwesomeIcon icon={faEnvelope} />
              </Form.Label>
              <Form.Control
                className="Auth-Modal_input"
                type="text"
                placeholder="Email"
                name="email"
                required
                aria-describedby="title-help"
                value={email}
                onChange={onChangeRegisterForm}
              />
            </Form.Group>
            <Form.Group className="groupInput">
              <Form.Label className="iconInput">
                <FontAwesomeIcon icon={faUnlockAlt} />
              </Form.Label>
              <Form.Control
                className="Auth-Modal_input"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChangeRegisterForm}
              />
            </Form.Group>
            <Form.Group className="groupInput">
              <Form.Label className="iconInput">
                <FontAwesomeIcon icon={faUnlockAlt} />
              </Form.Label>
              <Form.Control
                className="Auth-Modal_input"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChangeRegisterForm}
              />
            </Form.Group>
            <div className="Auth-Modal_button">
              <Button className="" variant="primary" type="submit">
                Sign Up
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Form.Text
              to="/"
              as={Link}
              className="Auth-Modal_footer forgot-pass"
            >
              Login <span className="hightLightText">Here</span>
            </Form.Text>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(RegisterForm);