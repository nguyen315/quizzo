import { Formik } from 'formik';
import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  showUpdateModal,
  updateProfile,
  uploadAvartar
} from '../../store/slices/auth.slice';
import { RootState } from '../../store/store';
import defaultImage from '../../assets/download.png';

const UpdateForm = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const setShowModal = () => {
    dispatch(showUpdateModal());
  };

  const resetUpdateForm = () => {
    setShowModal();
  };

  const update = async (values: any) => {
    try {
      const updatedForm = {
        firstName: values.firstName,
        lastName: values.lastName,
        avartar:
          values.avartar.files !== undefined
            ? values.avartar.files[0].name
            : auth.user?.avartar
      };
      if (values.avartar.files[0]) {
        const formData = new FormData();
        formData.append('avartar', values.avartar.files[0]);
        dispatch(uploadAvartar(formData));
      }
      dispatch(updateProfile(updatedForm));
    } catch (error) {
      console.log(error);
    }
  };
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://quizzo-service.herokuapp.com/uploads/avartar/'
      : 'http://localhost:5000/uploads/avartar/';
  return (
    <>
      <Modal
        className="Auth-Modal"
        show={auth.showUpdateModal}
        onHide={resetUpdateForm}
      >
        <Modal.Header className="Auth-Modal_header" closeButton>
          <Modal.Title className="Auth-Modal_title-2">
            Update profile
          </Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            firstName: auth.user?.firstName,
            lastName: auth.user?.lastName,
            avartar: auth.user?.avartar
          }}
          onSubmit={update}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue
          }) => (
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <Row>
                  <Col lg={3}>
                    <Form.Group controlId="formFile">
                      <img
                        src={
                          values.avartar !== ''
                            ? baseUrl + values.avartar
                            : defaultImage
                        }
                        alt=""
                        width="150"
                        height="150"
                      />
                      <Form.Control
                        type="file"
                        className="custom-file-input"
                        name="avartar"
                        onChange={(event) =>
                          setFieldValue('avartar', event.target)
                        }
                        onBlur={handleBlur}
                      />
                      <Form.Label className="lable-form-2">Change</Form.Label>
                    </Form.Group>
                  </Col>

                  <Col lg={9}>
                    <Row>
                      <Col lg={2}>
                        <Form.Label className="lable-form">Email</Form.Label>
                      </Col>
                      <Col lg={10}>
                        <Form.Group className="groupInput">
                          <Form.Control
                            className="Auth-Modal_input-2"
                            type="text"
                            name="email"
                            disabled
                            value={auth.user?.email}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={2}>
                        <Form.Label>Username</Form.Label>
                      </Col>
                      <Col>
                        <Form.Group className="groupInput">
                          <Form.Control
                            className="Auth-Modal_input-2"
                            type="text"
                            name="username"
                            disabled
                            value={auth.user?.username}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={2}>
                        <Form.Label className="lable-form">
                          Firstname
                        </Form.Label>
                      </Col>
                      <Col lg={10}>
                        <Form.Group className="groupInput">
                          <Form.Control
                            className="Auth-Modal_input-2"
                            type="text"
                            placeholder="Type your first name"
                            name="firstName"
                            required
                            aria-describedby="title-help"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={2}>
                        <Form.Label className="lable-form">Lastname</Form.Label>
                      </Col>
                      <Col lg={10}>
                        <Form.Group className="groupInput">
                          <Form.Control
                            className="Auth-Modal_input-2"
                            type="text"
                            placeholder="Type your last name"
                            name="lastName"
                            required
                            aria-describedby="title-help"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <div className="Auth-Modal_button">
                  <Button className="" variant="primary" type="submit">
                    Update
                  </Button>
                </div>
              </Modal.Body>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default UpdateForm;
