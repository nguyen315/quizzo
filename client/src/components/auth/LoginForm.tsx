import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  showModal,
  showRegisterModal,
  loginUser
} from '../../store/slices/auth.slice';
import '../../css/auth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  username: yup.string().required('*username is required'),
  password: yup.string().required('*password is required')
});

const LoginForm = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const setShowModal = () => {
    dispatch(showModal());
  };

  const goToSignUp = () => {
    dispatch(showModal());
    dispatch(showRegisterModal());
  };

  const login = async (data: any) => {
    try {
      await dispatch(loginUser(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal className="Auth-Modal" show={auth.showModal} onHide={setShowModal}>
        <Modal.Header className="Auth-Modal_header" closeButton>
          <Modal.Title className="Auth-Modal_title">Log In</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            await login(values);
            resetForm();
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit
          }) => (
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                {auth.error ? (
                  <div className="response-error-message">{auth.error}</div>
                ) : null}

                {/* username */}
                <Form.Group className="groupInput">
                  <Form.Label className="iconInput">
                    <FontAwesomeIcon icon={faUser} />
                  </Form.Label>
                  <Form.Control
                    className="Auth-Modal_input"
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.username && !!errors.username}
                  />

                  {/* error message username */}
                  <Form.Control.Feedback
                    type="invalid"
                    className="error-message"
                  >
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* password */}
                <Form.Group className="groupInput">
                  <Form.Label className="iconInput">
                    <FontAwesomeIcon icon={faUnlockAlt} />
                  </Form.Label>
                  <Form.Control
                    className="Auth-Modal_input"
                    type="password"
                    placeholder="********"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="error-message"
                  >
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Text
                  to="/forgotPassword"
                  as={Link}
                  className="forgot-pass"
                >
                  Forgot <span className="hightLightText">password</span>
                </Form.Text>

                <div className="Auth-Modal_button">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
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
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default LoginForm;
