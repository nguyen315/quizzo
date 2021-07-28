import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  showRegisterModal,
  showModal,
  registerUser
} from '../../store/slices/auth.slice';
import '../../css/auth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faUnlockAlt,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  username: yup.string().required('*Username is required'),
  email: yup
    .string()
    .required('*Email is required')
    .email('*Email must be a valid email'),
  password: yup.string().required('*Password is required'),
  confirmPassword: yup
    .string()
    .test(
      'passwords-match',
      '*Confirm Password does not math',
      function (value) {
        return this.parent.password === value;
      }
    )
});

const RegisterForm: React.FC = (props: any) => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const setShowModal = () => {
    dispatch(showRegisterModal());
  };

  const goToLogin = () => {
    dispatch(showRegisterModal());
    dispatch(showModal());
  };

  const register = async (signUpData: any) => {
    try {
      await dispatch(registerUser(signUpData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        className="Auth-Modal"
        show={auth.showRegisterModal}
        onHide={setShowModal}
      >
        <Modal.Header className="Auth-Modal_header" closeButton>
          <Modal.Title className="Auth-Modal_title">Sign Up</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            username: '',
            password: '',
            email: '',
            confirmPassword: ''
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            await register(values);
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
                {/* response error message */}
                {auth.registerError ? (
                  <div className="response-error-message">
                    {auth.registerError}
                  </div>
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
                    required
                    aria-describedby="title-help"
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

                {/* email */}
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
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && !!errors.email}
                  />

                  {/* error message email */}
                  <Form.Control.Feedback
                    type="invalid"
                    className="error-message"
                  >
                    {errors.email}
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
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && !!errors.password}
                  />

                  {/* error message password */}
                  <Form.Control.Feedback
                    type="invalid"
                    className="error-message"
                  >
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* confirm password */}
                <Form.Group className="groupInput">
                  <Form.Label className="iconInput">
                    <FontAwesomeIcon icon={faUnlockAlt} />
                  </Form.Label>
                  <Form.Control
                    className="Auth-Modal_input"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={
                      touched.confirmPassword && !!errors.confirmPassword
                    }
                  />

                  {/* error message confirm password */}
                  <Form.Control.Feedback
                    type="invalid"
                    className="error-message"
                  >
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* sign up button  */}
                <div className="Auth-Modal_button">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </Button>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Form.Text
                  to="/"
                  as={Link}
                  className="Auth-Modal_footer forgot-pass"
                  onClick={goToLogin}
                >
                  Login <span className="hightLightText">Here</span>
                </Form.Text>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default RegisterForm;
