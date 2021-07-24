import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AddQuestionModal: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const resetModalData = () => {
    setShowModal(!showModal);
  };
  const onClick = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <Button onClick={onClick}>Create new question</Button>
      <Modal show={showModal} onHide={resetModalData}>
        <Modal.Header closeButton>
          <Modal.Title>Add new question</Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control type="text" placeholder="Type" name="type" required />
          </Form.Group>
          <Form.Group>
            <Form.Control type="text" placeholder="Image" name="image" />
          </Form.Group>
          <Form.Group>
            <Form.Control type="text" placeholder="Tag Question" name="tagId" />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Answer A"
              name="answerA"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Answer B"
              name="answerB"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Answer C"
              name="answerC"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Answer D"
              name="answerD"
              required
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={resetModalData}>
              Cancle
            </Button>
            <Button variant="primary" type="submit">
              Create question
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddQuestionModal;
