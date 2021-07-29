import React from 'react';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import '../../css/room/room.css';

const Room = () => {
  return (
    <Card className="room">
      <Card.Body>
        <Card.Title className="room-question">
          It’s a me-Mario! Thank you for playing my game! It’s a me-Mario! Thank
          you for playing my game!
        </Card.Title>
        <Card.Text className="room-info">
          <div>Question ID: {}</div>
          <div>Tags: {}</div>
          <div>Total questions: {}</div>
          <div>Level: {}</div>
          <div>Time per question: {}</div>
          <div>Created at: {}</div>
        </Card.Text>
        <Button className="play-button">Play</Button>
        {/* <Button variant="primary">Play</Button> */}
      </Card.Body>
    </Card>
  );
};

export default Room;
