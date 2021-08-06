import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import Countdown from 'react-countdown';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useSelector } from 'react-redux';
import '../../css/countDown.css';
import { RootState } from '../../store/store';
import { socket } from '../../views/LandingPage';

const RenderTime = ({ remainingTime }: any) => {
  const currentTime = useRef(remainingTime);
  const prevTime = useRef(null);
  const isNewTimeFirstTick = useRef(false);
  const [, setOneLastRerender] = useState(0);

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true;
    prevTime.current = currentTime.current;
    currentTime.current = remainingTime;
  } else {
    isNewTimeFirstTick.current = false;
  }

  // force one last re-render when the time is over to tirgger the last animation
  if (remainingTime === 0) {
    setTimeout(() => {
      setOneLastRerender((val) => val + 1);
    }, 20);
  }

  const isTimeUp = isNewTimeFirstTick.current;

  return (
    <div className="time-wrapper">
      <div key={remainingTime} className={`time ${isTimeUp ? 'up' : ''}`}>
        {remainingTime}
      </div>
      {prevTime.current !== null && (
        <>
          <div
            key={prevTime.current}
            className={`time ${!isTimeUp ? 'down' : ''}`}
          >
            {prevTime.current}
          </div>
        </>
      )}
    </div>
  );
};

const CountDown: React.FC<any> = (props: any) => {
  const [count, setCount] = useState(0);

  const game = useSelector((state: RootState) => state.game);

  const handleSkipQuestion = () => {
    socket.emit('host-end-question', { roomId: game.roomId });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCount(1);
    }, props.timeUp * 1000);
  }, []);

  const time = props.timeUp;

  return (
    <>
      <CountdownCircleTimer
        isPlaying
        duration={time}
        colors={[
          ['#004777', 0.33],
          ['#F7B801', 0.33],
          ['#A30000', 0.33]
        ]}
      >
        {RenderTime}
      </CountdownCircleTimer>
      {count === 1 && handleSkipQuestion()}
    </>
  );
};

export default CountDown;
