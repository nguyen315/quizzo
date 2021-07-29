import React from 'react';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import '../../css/room/room.css';
import { RootState } from '../../store/store';

const Room = (props: { room: any }) => {
  return (
    <Card className="room">
      <Card.Body>
        <Card.Title className="room-question">
          It’s a me-Mario! Thank you for playing my game! It’s a me-Mario! Thank
          you for playing my game!
        </Card.Title>
        <Card.Text className="room-info">
          <div>Room PIN: {props.room.pinCode}</div>
          <div>Time per question: {props.room.timeUp}</div>
          <div>Created at: {props.room.createdAt}</div>
        </Card.Text>
        <Button className="play-button">Play</Button>
        {/* <Button variant="primary">Play</Button> */}
      </Card.Body>
    </Card>
  );
};

export default Room;
