import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';

import { Row, Col, Card, Pagination } from 'react-bootstrap';

import { ListGroup } from 'react-bootstrap';
import '../css/scoreboard.css';

const ScoreBoard = (props: any) => {
  const players = props.players;

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
        <Col lg={2}>{index + 1}</Col>
        <Col lg={6}>{String(element.username)}</Col>
        <Col lg={4}>{String(element.point)}</Col>
      </Row>
    </>
  ));

  const finalScoreboard = (
    <div className="container">
      <div className="parallax">
        <img src="https://returnpath.com/assets/images/backgrounds/background-confetti-xl-arcade.svg;" />
        <img src="https://returnpath.com/assets/images/backgrounds/background-confetti-lg-arcade.svg;" />
        <img src="https://returnpath.com/assets/images/backgrounds/background-confetti-md-arcade.svg;" />
        <img src="https://returnpath.com/assets/images/backgrounds/background-confetti-sm-arcade.svg;" />
        <img src="https://returnpath.com/assets/images/backgrounds/background-confetti-xs-arcade.svg" />
      </div>
    </div>
  );

  return (
    <>
      {/* {props.isLastQuestion ? finalScoreboard : ''} */}
      {finalScoreboard}
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
