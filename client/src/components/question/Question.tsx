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
  const baseUrl = 'http://localhost:5000/uploads/image/';
  return (
    <Card className="question" onClick={toggleAnswers}>
      <div className="img" style={{ backgroundColor: '#AAA' }}>
        <img
          src={baseUrl + props.question.image}
          alt=""
          width="200"
          height="200"
        />
      </div>
      <div className="content">
        <Card.Header>
          <div>Question ID: {props.question.id}</div>
          <div>Tags: {props.question.tagId || ''}</div>
        </Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>{props.question.title}</p>
          </blockquote>

          {isShowAnswers &&
            props.question.answers.map((answer: any) => (
              <Answer answer={answer} />
            ))}
        </Card.Body>
      </div>
    </Card>
  );
};

export default Question;
