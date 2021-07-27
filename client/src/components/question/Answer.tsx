import React from 'react';
import { Card, Form } from 'react-bootstrap';
import '../../css/questions/answer.css';

const Answer = (props: { answer: any }) => {
  return (
    <Form.Check
      type="radio"
      label={props.answer.content}
      disabled
      checked={props.answer.isCorrect}
      className={props.answer.isCorrect ? 'correct-answer' : 'answer'}
    />
  );
};

export default Answer;
