import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import rightArrow from '../../assets/right-arrow.svg';
import '../../css/landing/pin-field.css';
import { socket } from '../../views/LandingPage';

const PINField: React.FC = () => {
  const history = useHistory();
  const [pin, setPin] = useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    socket.emit('player-join-room', { roomId: pin });
    socket.subcribe(() => {
      history.push('/play-room-guest');
    });
  };

  const handleChange = (e: any) => {
    setPin(e.target.value);
  };

  return (
    <div id="pin-field">
      <form id="pin-form" className="enter-pin-field" onSubmit={handleSubmit}>
        <input
          id="pin"
          type="type"
          placeholder="Enter PIN to join"
          value={pin}
          onChange={handleChange}
        />
      </form>
      <button className="enter-arrow-btn" type="submit" form="pin-form">
        <img src={rightArrow} className="right-arrow" />
      </button>
    </div>
  );
};

export default PINField;
