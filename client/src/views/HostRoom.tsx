import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import CountDown from '../components/layouts/CountDown';
import LoggedInNavBar from '../components/layouts/LoggedInNavBar';
import { RootState } from '../store/store';
import { socket } from './LandingPage';

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
        <div>
          <h1>{question.title}</h1>
        </div>
        {question.answers.map((answer: any) => (
          <>
            <Button>{answer.content}</Button>
          </>
        ))}

        <div>
          <Button onClick={handleEndQuestion}>End Question</Button>
        </div>
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

  return (
    <>
      <CountDown timeUp={5} />
      <LoggedInNavBar />
      <div>
        {game.players?.map((player) => (
          <div>{player.username}</div>
        ))}
      </div>
      <div>PIN CODE: {game.roomId}</div>
      <Button onClick={handleStartQuestion}>Play Game</Button>
    </>
  );
};

export default HostRoom;
