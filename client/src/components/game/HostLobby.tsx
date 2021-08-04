import React from 'react';
import { Button, Container } from 'react-bootstrap';
import '../../css/game/lobby.css';

const data = {
  roomName: 'Quizzo test room name',
  roomId: 1,
  pinCode: '123066',
  players: [
    {
      userId: 1,
      username: 'nvtnhan'
    },
    {
      userId: 2,
      username: 'ttloc'
    },
    {
      userId: 3,
      username: 'hmnguyen'
    },
    {
      userId: 4,
      username: 'phphuong'
    },
    {
      userId: 5,
      username: 'lctoan'
    }
  ]
};

const HostLobby = () => {
  const handleStart = () => {
    console.log('start game');
  };

  return (
    <Container fluid className="lobby">
      {/* header */}
      <div className="pin-section">
        <div className="left-section">
          <span>PIN</span>
          <span>QR Code</span>
        </div>
        <div className="right-section">
          <span className="pin-code">{data.pinCode}</span>
          <div className="qr-image">
            <img src="#" />
          </div>
        </div>
      </div>

      {/* content */}
      <div className="lobby-content">
        {/* player */}
        <div className="user-panel">
          <div className="players-count">
            <span className="count">{data.players.length}</span>
            <span>Players</span>
          </div>
          <div className="lobby-room">
            {/* room name */}
            <div>
              <span className="lobby-room-name">{data.roomName}</span>
            </div>
            <div className="player-name-section">
              {data.players.map((player: any) => (
                <div className="player-name">{player.username}</div>
              ))}
            </div>
          </div>

          <div className="start-button-section">
            <Button onClick={handleStart} className="start-button">
              Start
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HostLobby;
