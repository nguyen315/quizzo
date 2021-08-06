import {
  updatePlayers,
  updateGame,
  updateQuestion,
  updateAnswerStatus,
  endGame
} from '../../store/slices/game.slice';

export const initListeners = (dispatch: any, socker: any) => {
  socker.on('connect', () => {
    console.log('connected');
  });

  socker.on('created-room', (data: any) => {
    // data have roomId, role='host', id of socket client
    const { roomId, role, id } = data;
    dispatch(updateGame({ roomId, role, userId: id }));
  });
  socker.on('player-join-room', (data: any) => {
    // data have array of players
    // player have username, roomId, id of socket client, point
    dispatch(updatePlayers(data));
  });

  // subcribe a callback to push history to /play-room-guest when client join an available room
  socker.subcribe = function (cb: any) {
    socker.on('player-joined', (data: any) => {
      dispatch(updateGame({ roomId: data.roomId }));
      cb();
    });
  };

  socker.on('player-joined-with-name', (data: any) => {
    const { username, id } = data;
    dispatch(updateGame({ username: username, userId: id }));
  });

  socker.on('next-question', (data: any) => {
    dispatch(updateQuestion(data));
    dispatch(updateAnswerStatus({ status: 'not done' }));
  });

  socker.on('question-ended', (data: any) => {
    dispatch(updatePlayers(data));
    dispatch(updateAnswerStatus({ status: 'result' }));
  });

  socker.on('last-question', (data: any) => {
    dispatch(updatePlayers(data));
    dispatch(updateAnswerStatus({ status: 'end' }));
  });

  socker.on('game-ended', (data: any) => {
    dispatch(endGame());
  });

  socker.on('leave', () => {
    alert('host leave');
    dispatch(endGame());
  });
};
