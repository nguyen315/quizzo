import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../../css/questions/createQuestionForm.css';
import { BsPlusCircleFill } from 'react-icons/bs';

const CreateQuestionForm = () => {
  const [isExpand, setIsExpand] = useState(false);

  const toggleCreateQuestionForm = () => {
    setIsExpand((prevState) => !prevState);
  };
  return (
    <div>
      <div
        className="center-label clickable"
        onClick={toggleCreateQuestionForm}
      >
        <span className="title create-question-title">Create Question </span>
        <BsPlusCircleFill className="fill-icon" />
      </div>
      {isExpand && (
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
};

export default CreateQuestionForm;
