import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';

import { Row, Col, Card, Pagination } from 'react-bootstrap';

import { ListGroup } from 'react-bootstrap';
import '../css/scoreboard.css';

const ScoreBoard: React.FC = () => {
  const ranking = {
    top5: [
      {
        username: 'user1',
        score: 10000
      },
      {
        username: 'user2',
        score: 9000
      },
      {
        username: 'user3',
        score: 8000
      },
      {
        username: 'user4',
        score: 7000
      },
      {
        username: 'user5',
        score: 6000
      }
    ]
  };

  return (
    <>
      <Container fluid>
        <Row className="score-board">
          <p>ScoreBoard</p>
        </Row>
        <Row className="next-button">
          <Button id="next-button">Next</Button>
        </Row>
        <Container className="score-container">
          <Row className="score">
            <Col>1 &nbsp; &nbsp; {String(ranking.top5[0].username)}</Col>
            <Col>{String(ranking.top5[0].score)}</Col>
          </Row>
          <Row className="score">
            <Col> 1 &nbsp; &nbsp; {ranking.top5[1].username}</Col>
            <Col>{ranking.top5[1].score}</Col>
          </Row>
          <Row className="score">
            <Col> 1 &nbsp; &nbsp; {ranking.top5[2].username}</Col>
            <Col>{ranking.top5[2].score}</Col>
          </Row>
          <Row className="score">
            <Col> 1 &nbsp; &nbsp; {ranking.top5[3].username}</Col>
            <Col>{ranking.top5[3].score}</Col>
          </Row>
          <Row className="score">
            <Col> 1 &nbsp; &nbsp; {ranking.top5[4].username}</Col>
            <Col>{ranking.top5[4].score}</Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default ScoreBoard;
