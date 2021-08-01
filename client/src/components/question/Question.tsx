import React, { useState } from 'react';
import { Card, Row } from 'react-bootstrap';
import Answer from './Answer';
import Tag from './Tag';
import '../../css/questions/question.css';
import { BiTrashAlt } from 'react-icons/bi';
import { AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import defaultImage from '../../assets/download.png';

const Question = (props: { question: any }) => {
  const [isExpand, setIsExpand] = useState(false);

  const toggleAnswers = () => {
    setIsExpand((prevState) => {
      return !prevState;
    });
  };
  const baseUrl = 'http://localhost:5000/uploads/image/';
  return (
    <Card className="question">
      <Card.Body className="content">
        {/* expand icon */}
        <span className="clickable" onClick={toggleAnswers}>
          {isExpand ? (
            <MdKeyboardArrowDown className="icon ml-0 mt-3px" />
          ) : (
            <MdKeyboardArrowRight className="icon ml-0 mt-3px" />
          )}
        </span>

        <div className="question-section">
          {/* question title */}
          <blockquote className="blockquote">
            <div className="clickable" onClick={toggleAnswers}>
              <span>{props.question.title}</span>
            </div>
            {/* <Card className="question" onClick={toggleAnswers}>
      <div className="img" style={{ backgroundColor: '#AAA' }}>
        <img
          src={
            props.question.image !== ''
              ? baseUrl + props.question.image
              : defaultImage
          }
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
            <p>{props.question.title}</p> */}
          </blockquote>

          {/* tags */}
          <div>
            {/* "?" in tags to check if exist tags then render */}
            {props.question.tags?.map((tag: any) => (
              <Tag tag={tag} key={tag.id} />
            ))}
          </div>
          {/* expand answer */}
          <div className="answers-content">
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

        {/* icon & date section */}
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
