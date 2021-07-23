import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { showUpdateModal, updateProfile } from '../../store/slices/auth.slice';
import { RootState } from '../../store/store';

const UpdateForm = (props: any) => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [updateForm, setUpdateForm] = useState({
    firstName: auth.user?.firstName,
    lastName: auth.user?.lastName
  });

  const setShowModal = () => {
    dispatch(showUpdateModal());
  };

  const { firstName, lastName } = updateForm;

  const onChangeUpdateForm = (e: any) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const resetUpdateForm = () => {
    setUpdateForm({
      firstName: auth.user?.firstName,
      lastName: auth.user?.lastName
    });
    setShowModal();
  };

  const update = async (event: any) => {
    event.preventDefault();
    try {
      dispatch(updateProfile(updateForm));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        className="Auth-Modal"
        show={auth.showUpdateModal}
        onHide={resetUpdateForm}
      >
        <Modal.Header className="Auth-Modal_header" closeButton>
          <Modal.Title className="Auth-Modal_title">Update profile</Modal.Title>
        </Modal.Header>
        <Form onSubmit={update}>
          <Modal.Body>
            <Form.Group className="groupInput">
              <Form.Control
                className="Auth-Modal_input"
                type="text"
                placeholder="Type your first name"
                name="firstName"
                required
                aria-describedby="title-help"
                value={firstName}
                onChange={onChangeUpdateForm}
              />
            </Form.Group>

            <Form.Group className="groupInput">
              <Form.Control
                className="Auth-Modal_input"
                type="text"
                placeholder="Type your last name"
                name="lastName"
                required
                aria-describedby="title-help"
                value={lastName}
                onChange={onChangeUpdateForm}
              />
            </Form.Group>
            <div className="Auth-Modal_button">
              <Button className="" variant="primary" type="submit">
                Ok
              </Button>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateForm;
