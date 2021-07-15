import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { showModal, loginUser } from "../../store/actions/auth/authActions";
import { connect } from "react-redux";

const LoginForm = (props: any) => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const setShowModal = () => {
    dispatch(showModal());
  };

  const { username, password } = loginForm;

  const onChangeLoginForm = (e: any) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const resetFormLogin = () => {
    setLoginForm({ username: "", password: "" });
    setShowModal();
  };

  const login = async (event: any) => {
    event.preventDefault();
    try {
      dispatch(loginUser(loginForm));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal show={props.auth.showModal} onHide={resetFormLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Login Form</Modal.Title>
        </Modal.Header>
        <Form onSubmit={login}>
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
                onChange={onChangeLoginForm}
              />
              <Form.Text id="title-help" muted>
                Required
              </Form.Text>
            </Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="********"
                name="password"
                value={password}
                onChange={onChangeLoginForm}
              />
              <Form.Text id="title-help" muted>
                Required
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={resetFormLogin}>
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

export default connect(mapStateToProps)(LoginForm);
