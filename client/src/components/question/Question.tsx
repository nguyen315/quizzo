import React, { useState } from 'react';
import { Card, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import Answer from './Answer';
import Tag from './Tag';
import '../../css/questions/question.css';
import { BiTrashAlt } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdExpandMore } from 'react-icons/md';
import { IconContext } from 'react-icons';

const Question = (props: { question: any }) => {
  const [isExpand, setIsExpand] = useState(false);

  const toggleAnswers = () => {
    setIsExpand((prevState) => {
      return !prevState;
    });
  };

  return (
    <Card className="question">
      <div className="content">
        <Card.Body>
          {/* header */}
          <div className="question-header">
            <div className="question-section">
              <blockquote className="blockquote">
                <div className="clickable" onClick={toggleAnswers}>
                  <span>{props.question.title}</span>
                </div>
              </blockquote>

              {/* tags */}
              <div className="d-inline-block">
                {props.question.tags.map((tag: any) => (
                  <Tag tag={tag} key={tag.id} />
                ))}
              </div>
            </div>
            <div className="d-inline">
              <span className="clickable" onClick={toggleAnswers}>
                <MdExpandMore className="icon" />
              </span>
              <span className="clickable ">
                <AiOutlineEdit className="icon" />
              </span>
              <span className="clickable">
                <BiTrashAlt className="icon" fill="#ED4867" />
              </span>
            </div>
          </div>

          {/* expand content */}
          <div className="question-content">
            {/* answer */}
            {isExpand && (
              <Form>
                {props.question.answers.map((answer: any) => (
                  <Answer answer={answer} />
                ))}
              </Form>
            )}
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};

export default Question;
