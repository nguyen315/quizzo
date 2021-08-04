import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import HostLobby from '../components/game/HostLobby';
import CountDown from '../components/layouts/CountDown';
import LoggedInNavBar from '../components/layouts/LoggedInNavBar';
import { RootState } from '../store/store';
import { socket } from './LandingPage';
import '../css/roomPlaying.css';

const HostRoom = () => {
  const game = useSelector((state: RootState) => state.game);
  const history = useHistory();

  const handleStartQuestion = () => {
    socket.emit('host-start-question', { roomId: game.roomId });
  };
  const handleEndQuestion = () => {
    socket.emit('host-end-question', { roomId: game.roomId });
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
          <Col xs={6}>Image</Col>
          <Col>
            <div>
              <Button className="next-question-btn" onClick={handleEndQuestion}>
                Next
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          {game.question.answers.map((answer: any) => (
            <Col xs={6} className="host-answer">
              <Button
                id={
                  answer.id % 4 === 0
                    ? 'blue'
                    : answer.id % 4 === 1
                    ? 'orange'
                    : answer.id % 4 === 2
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

  // display leaderboard
  if (game.question && game.answerStatus === 'rank') {
    const question = game.question;
    return (
      <>
        {game.players.map((player: any) => (
          <>
            <div>
              <div>
                <span>
                  {player.username}: {player.point}
                </span>
              </div>
            </div>
          </>
        ))}
        <div>
          <Button onClick={handleStartQuestion}>Next Question</Button>
        </div>
      </>
    );
  }

  // display leaderboard & endgame
  if (game.question && game.answerStatus === 'end') {
    const question = game.question;
    return (
      <>
        {game.players.map((player: any) => (
          <>
            <div>
              <div>
                <span>
                  {player.username}: {player.point}
                </span>
              </div>
            </div>
          </>
        ))}
        <div>
          <Button onClick={handleEndGame}>End Game</Button>
        </div>
      </>
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
