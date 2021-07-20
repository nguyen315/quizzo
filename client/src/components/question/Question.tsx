import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Answer from './Answer';
import '../../css/questions/question.css';

const Question = (props: { question: any }) => {
  const [isShowAnswers, setIsShowAnswers] = useState(false);

  const toggleAnswers = () => {
    setIsShowAnswers((prevState) => {
      return !prevState;
    });
  };

  return (
    <Card className="question" onClick={toggleAnswers}>
      <Card.Header>Question ID: {props.question.id} </Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>{props.question.title}</p>
        </blockquote>

        {isShowAnswers &&
          props.question.answers.map((answer: any) => (
            <Answer answer={answer} />
          ))}
      </Card.Body>
    </Card>
  );
};

export default Question;
