import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { socket } from './LandingPage';

import { updateAnswerStatus } from '../store/slices/game.slice';
import { Redirect } from 'react-router-dom';
import '../css/playerRoom.css';

const PlayerRoom = () => {
  const game = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');

  const handleChangeName = (event: any) => {
    setUsername(event.target.value);
  };

  const playerSubmit = (e: any) => {
    const answerId = e.target.value;
    dispatch(updateAnswerStatus({ status: 'done' }));
    socket.emit('player-submit', {
      roomId: game.roomId,
      userId: game.userId,
      questionId: game.question.id,
      answerId: answerId,
      timeStamp: new Date()
    });
  };

  const handleJoin = (event: any) => {
    event.preventDefault();
    socket.emit('player-enter-name', {
      username: username,
      roomId: game.roomId
    });
  };

  if (!game.roomId) {
    return <Redirect to="/" />;
  }

  if (!game.username) {
    return (
      <>
        <Form onSubmit={handleJoin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Enter username to join"
              value={username}
              onChange={handleChangeName}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </>
    );
  }

  if (game.question && game.answerStatus === 'not done') {
    return (
      <>
        <h2 className="question-title">{game.question.title}</h2>
        <Row>
          {game.question.answers.map((answer: any) => (
            <Col xs={6}>
              <Button
                onClick={playerSubmit}
                value={answer.id}
                id={
                  answer.id % 4 == 0
                    ? 'blue'
                    : answer.id % 4 == 1
                    ? 'orange'
                    : answer.id % 4 == 2
                    ? 'red'
                    : 'green'
                }
                className="answer-option"
              >
                {answer.content}
              </Button>
            </Col>
          ))}
        </Row>
      </>
    );
  }

  if (game.question && game.answerStatus === 'done') {
    return (
      <>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>

        <div className="result-page">
          <div className="answered">You answered!</div>
          <div className="text">Waiting for the result \( ﾟヮﾟ)/</div>
        </div>
      </>
    );
  }

  if (
    game.question &&
    (game.answerStatus === 'rank' || game.answerStatus === 'end')
  ) {
    return (
      <>
        {game.players.map((player: any) => (
          <div>
            <span>
              {player.username}: {player.point}
            </span>
          </div>
        ))}
      </>
    );
  }

  return (
    <div>
      {!game.username ? (
        <>
          <Form onSubmit={handleJoin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter username to join"
                value={username}
                onChange={handleChangeName}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </>
      ) : (
        <>Wait for host start the game </>
      )}
    </div>
  );
};

export default PlayerRoom;
