import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import HostLobby from '../components/game/HostLobby';
import CountDown from '../components/layouts/CountDown';
import LoggedInNavBar from '../components/layouts/LoggedInNavBar';
import { RootState } from '../store/store';
import { socket } from './LandingPage';
import '../css/roomPlaying.css';
import { updateAnswerStatus } from '../store/slices/game.slice';
import ScoreBoard from './ScoreBoard';

const HostRoom = () => {
  const game = useSelector((state: RootState) => state.game);
  const history = useHistory();
  const dispatch = useDispatch();

  const isLastQuestion = game.questionsLength - 1 === game.questionsCount;

  const url =
    process.env.NODE_ENV === 'production'
      ? 'https://quizzo-service.herokuapp.com/uploads/image/'
      : 'http://localhost:5000/uploads/image/';

  const handleStartQuestion = () => {
    socket.emit('host-start-question', { roomId: game.roomId });
  };

  const handleSkipQuestion = () => {
    socket.emit('host-end-question', { roomId: game.roomId });
  };

  const handleDisplayRank = () => {
    dispatch(updateAnswerStatus({ status: 'rank' }));
  };

  const handleEndGame = () => {
    socket.emit('host-end-game', { roomId: game.roomId });
  };

  // when endGame, roomId will be deleted, then push to landingpage
  if (!game.roomId) {
    history.push('/');
  }

  // display question
  if (game.question && game.answerStatus === 'not done') {
    const question = game.question;
    return (
      <>
        <h2 className="question-title">{question.title}</h2>
        <Row className="host-answer-row">
          <Col>
            <CountDown timeUp={game.timeUp} />
          </Col>
          <Col xs={6}>
            {question.image === '' ? (
              ''
            ) : (
              <img src={url + question.image} width="200" height="200" />
            )}
          </Col>
          <Col>
            <div>
              <Button
                className="next-question-btn"
                onClick={handleSkipQuestion}
              >
                Skip
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          {game.question.answers.map((answer: any, index: any) => (
            <Col xs={6} className="host-answer">
              <Button
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

  // Display result
  if (game.question && game.answerStatus === 'result') {
    const question = game.question;
    return (
      <>
        <h2 className="question-title">{question.title}</h2>
        <Row className="host-answer-row">
          <Col></Col>
          <Col xs={6}>
            {question.image === '' ? (
              ''
            ) : (
              <img src={url + question.image} width="200" height="200" />
            )}
          </Col>
          <Col>
            <div>
              <Button className="next-question-btn" onClick={handleDisplayRank}>
                Next
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          {game.question.answers.map((answer: any) => (
            <Col xs={6} className="host-answer">
              <Button
                id={answer.isCorrect === true ? 'correct' : 'incorrect'}
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

  // display leaderboard
  if (game.question && game.answerStatus === 'rank') {
    return (
      <ScoreBoard
        players={game.players}
        isLastQuestion={isLastQuestion}
        handleStartQuestion={handleStartQuestion}
        handleEndGame={handleEndGame}
      />
    );
  }

  // render lobby
  return (
    <>
      <HostLobby handleStartQuestion={handleStartQuestion} />
    </>
  );
};

export default HostRoom;
