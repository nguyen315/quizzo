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

  let content = ranking.top5.map((element, index) => (
    <>
      <Row className="score">
        <Col>
          {index + 1} &nbsp; &nbsp; {String(element.username)}
        </Col>
        <Col>{String(element.score)}</Col>
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
          <Button id="next-button">Next</Button>
        </Row>
        <Container className="score-container">{content}</Container>
      </Container>
    </>
  );
};

export default ScoreBoard;
