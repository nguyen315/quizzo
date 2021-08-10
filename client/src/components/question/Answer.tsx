import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import '../../css/questions/answer.css';

const Answer = (props: any) => {
  return (
    <Col xs="12" md="6" className="p-0">
      <div
        className={
          props.answer.isCorrect
            ? `answer background-color-index-${props.index}`
            : `answer border-color-index-${props.index}`
        }
      >
        {props.answer.content}
      </div>
    </Col>
  );
};

export default Answer;
