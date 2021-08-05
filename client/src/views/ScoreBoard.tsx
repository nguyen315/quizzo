import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';

import { Row, Col, Card, Pagination } from 'react-bootstrap';

import { ListGroup } from 'react-bootstrap';
import '../css/scoreboard.css';

const ScoreBoard = (props: any) => {
  const players = props.players;
  console.log(players);
  const ranking = players.slice().sort((a: any, b: any) => {
    return parseInt(b.point) - parseInt(a.point);
  });

  const handleClick = () => {
    if (props.isLastQuestion) {
      props.handleEndGame();
    } else {
      props.handleStartQuestion();
    }
  };

  let content = ranking.slice(0, 5).map((element: any, index: any) => (
    <>
      <Row className="score">
        <Col>
          {index + 1} &nbsp; &nbsp; {String(element.username)}
        </Col>
        <Col>{String(element.point)}</Col>
      </Row>
    </>
  ));

  return (
    <>
      <Container fluid>
        <Row className="score-board">
          <p>ScoreBoard</p>
        </Row>
        <Row className="next-button">
          <Button id="next-button" onClick={handleClick}>
            {props.isLastQuestion ? 'End Game' : 'Next'}
          </Button>
        </Row>
        <Container className="score-container">{content}</Container>
      </Container>
    </>
  );
};

export default ScoreBoard;
