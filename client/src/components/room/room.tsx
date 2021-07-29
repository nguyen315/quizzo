import React from 'react';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import '../../css/room/room.css';
import { Dropdown } from 'react-bootstrap';

const Room = () => {
  return (
    <Card className="room">
      <Card.Body>
        <Card.Title className="room-title">
          It’s a me-Mario! Thank you for playing my game! It’s a me-Mario! Thank
          you for playing my game!
        </Card.Title>

        <Dropdown className="drop-down">
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
          ></Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Preview</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Report</Dropdown.Item>
            <Dropdown.Item href="#/action-3" id="delete">
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Card.Text className="info">
          <div>
            <label className="room-info">Room PIN:</label>
            <span className="room-info-answer" id="room-pin">
              123456 {}
            </span>
          </div>
          <div>
            <label className="room-info">Total questions:</label>
            <span className="room-info-answer">10</span>
          </div>
          <div>
            <label className="room-info">Level:</label>
            <span className="room-info-answer" id="level">
              hard
            </span>
          </div>
          <div>
            <label className="room-info">Time per question:</label>
            <span className="room-info-answer">30s</span>
          </div>
          <div>
            <label className="room-info">Created at:</label>
            <span className="room-info-answer">30/06/2021</span>
          </div>
        </Card.Text>
        <Button className="play-button">Play</Button>
        {/* <Button variant="primary">Play</Button> */}
      </Card.Body>
    </Card>
  );
};

export default Room;
