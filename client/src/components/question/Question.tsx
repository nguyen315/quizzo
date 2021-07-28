import React, { useState } from 'react';
import {
  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
  Row
} from 'react-bootstrap';
import Answer from './Answer';
import Tag from './Tag';
import '../../css/questions/question.css';
import { BiTrashAlt } from 'react-icons/bi';
import { AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';

const Question = (props: { question: any }) => {
  const [isExpand, setIsExpand] = useState(false);

  const toggleAnswers = () => {
    setIsExpand((prevState) => {
      return !prevState;
    });
  };

  return (
    <Card className="question">
      <Card.Body className="content">
        <span className="clickable" onClick={toggleAnswers}>
          {isExpand ? (
            <MdKeyboardArrowDown className="icon ml-0 mt-1" />
          ) : (
            <MdKeyboardArrowRight className="icon ml-0 mt-1" />
          )}
        </span>

        <div className="question-section">
          <blockquote className="blockquote">
            <div className="clickable" onClick={toggleAnswers}>
              <span>{props.question.title}</span>
            </div>
          </blockquote>

          {/* tags */}
          <div>
            {props.question.tags.map((tag: any) => (
              <Tag tag={tag} key={tag.id} />
            ))}
          </div>
          {/* expand content */}
          <div className="question-content">
            {/* answer */}
            {isExpand && (
              <Row className="mt-4 mb -4 mr-0 ml-0 flex-grow-1">
                {props.question.answers.map((answer: any, index: number) => (
                  <Answer answer={answer} key={answer.id} index={index} />
                ))}
              </Row>
            )}
          </div>
          <div className="smaller-font mt-4 clickable link">Preview image</div>
        </div>

        <div className="right-section">
          <div className="icon-section">
            <span className="clickable ">
              <AiOutlineEye className="icon" />
            </span>
            <span className="clickable ">
              <AiOutlineEdit className="icon" />
            </span>
            <span className="clickable">
              <BiTrashAlt className="icon" fill="#ED4867" />
            </span>
          </div>

          <div className="smaller-font date">
            {props.question.updatedAt.toLocaleString('en-SG')}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Question;
