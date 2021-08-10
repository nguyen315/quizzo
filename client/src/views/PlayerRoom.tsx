import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { socket } from './LandingPage';

import { updateAnswerStatus } from '../store/slices/game.slice';
import { Redirect } from 'react-router-dom';
import '../css/roomPlaying.css';

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
    if (username != '') {
      socket.emit('player-enter-name', {
        username: username,
        roomId: game.roomId
      });
    }
  };

  if (!game.roomId) {
    return <Redirect to="/" />;
  }

  if (!game.username) {
    return (
      <>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>

        <div className="result-page">
          <div className="wellcome-line answered">
            Welcome to room {game.roomId}
          </div>
          <Form onSubmit={handleJoin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                className="submit-form"
                type="text"
                placeholder="Enter name to join !!!"
                value={username}
                onChange={handleChangeName}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </>
    );
  }

  if (game.question && game.answerStatus === 'not done') {
    return (
      <>
        <h2 className="question-title">{game.question.title}</h2>
        <Row>
          {game.question.answers.map((answer: any, index: any) => (
            <Col xs={6}>
              <Button
                onClick={playerSubmit}
                value={answer.id}
                id={
                  index % 4 === 0
                    ? 'blue'
                    : index % 4 === 1
                    ? 'orange'
                    : index % 4 === 2
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
    (game.answerStatus === 'rank' || game.answerStatus === 'result')
  ) {
    const players = game.players;
    const ranking = players.slice().sort((a: any, b: any) => {
      return parseInt(b.point) - parseInt(a.point);
    });
    const player = ranking.findIndex((e) => e.id === game.userId);
    return (
      <>
        <div className={ranking[player].isCorrect ? 'correct-answer' : 'hero'}>
          <div className="result-page">
            <div className="result-content">
              <div className="answered">
                {ranking[player].isCorrect ? 'Correct' : 'Wrong'}
              </div>
              <div className="text">You are in {player + 1} place</div>
            </div>
            <div className="footer-player-result">
              <div className="username">{ranking[player].username}</div>
              <div className="point">{ranking[player].point}</div>
            </div>
          </div>

          <div
            className={ranking[player].isCorrect ? 'cube-correct' : 'cube'}
          ></div>
          <div
            className={ranking[player].isCorrect ? 'cube-correct' : 'cube'}
          ></div>
          <div
            className={ranking[player].isCorrect ? 'cube-correct' : 'cube'}
          ></div>
          <div
            className={ranking[player].isCorrect ? 'cube-correct' : 'cube'}
          ></div>
          <div
            className={ranking[player].isCorrect ? 'cube-correct' : 'cube'}
          ></div>
          <div
            className={ranking[player].isCorrect ? 'cube-correct' : 'cube'}
          ></div>
        </div>
      </>
    );
  }

  return (
    <>
      {!game.username ? (
        <>
          <div className="bg"></div>
          <div className="bg bg2"></div>
          <div className="bg bg3"></div>

          <div className="result-page">
            <div className="wellcome-line answered">
              Welcome to room {game.roomId}
            </div>
            <Form onSubmit={handleJoin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  className="submit-form"
                  type="text"
                  placeholder="Enter name to join !!!"
                  value={username}
                  onChange={handleChangeName}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </>
      ) : (
        <>
          <div className="hero">
            <div className="result-page">
              <div className="answered">You are in!</div>
              <div className="text">
                Waiting for the host to start! \( ﾟヮﾟ)/
              </div>
              <div className="text">see your name on screen?</div>
            </div>
            <div className="cube"></div>
            <div className="cube"></div>
            <div className="cube"></div>
            <div className="cube"></div>
            <div className="cube"></div>
            <div className="cube"></div>
          </div>
        </>
      )}
    </>
  );
};

export default PlayerRoom;
