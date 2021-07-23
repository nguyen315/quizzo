import React from 'react';
import { Card } from 'react-bootstrap';
import '../../css/questions/answer.css';

const Answer = (props: { answer: any }) => {
  return (
    <Card className="answerItem">
      <Card.Body>{props.answer.content}</Card.Body>
    </Card>
  );
};

export default Answer;
