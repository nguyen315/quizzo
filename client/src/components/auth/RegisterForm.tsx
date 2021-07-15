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
      <Modal show={props.auth.showRegisterModal} onHide={resetFormRegister}>
        <Modal.Header closeButton>
          <Modal.Title>Login Form</Modal.Title>
        </Modal.Header>
        <Form onSubmit={register}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                required
                aria-describedby="title-help"
                value={username}
                onChange={onChangeRegisterForm}
              />
              <Form.Text id="title-help" muted>
                Required
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                name="email"
                required
                aria-describedby="title-help"
                value={email}
                onChange={onChangeRegisterForm}
              />
              <Form.Text id="title-help" muted>
                Required
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                name="password"
                value={password}
                onChange={onChangeRegisterForm}
              />
              <Form.Text id="title-help" muted>
                Required
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChangeRegisterForm}
              />
              <Form.Text id="title-help" muted>
                Required
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={resetFormRegister}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Login
            </Button>
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
