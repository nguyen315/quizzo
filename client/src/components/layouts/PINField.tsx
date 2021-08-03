import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import rightArrow from '../../assets/right-arrow.svg';
import '../../css/landing/pin-field.css';
import { socket } from '../../views/LandingPage';

const PINField: React.FC = () => {
  const history = useHistory();
  const [pin, setPin] = useState('');

  const handleClick = () => {
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
      <form className="enter-pin-field">
        <input
          id="pin"
          type="type"
          placeholder="Enter PIN to join"
          value={pin}
          onChange={handleChange}
        />
      </form>
      <button className="enter-arrow-btn" type="button" onClick={handleClick}>
        <img src={rightArrow} className="right-arrow" />
      </button>
    </div>
  );
};

export default PINField;
