import React from 'react';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import '../../css/room/room.css';
import { Dropdown } from 'react-bootstrap';
import { RootState } from '../../store/store';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const Room = (props: { room: any }) => {
  return (
    <Card className="room">
      <Card.Body>
        <Card.Title className="room-title">
          {props.room.name?.length > 30
            ? props.room.name.slice(0, 30) + ' ...'
            : props.room.name}
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
              {props.room.pinCode}
            </span>
          </div>
          <div>
            <label className="room-info">Level:</label>
            <span className="room-info-answer" id="level">
              {props.room.level <= 10
                ? 'Easy'
                : props.room.level <= 20
                ? 'Medium'
                : 'Hard'}
            </span>
          </div>
          <div>
            <label className="room-info">Time per question:</label>
            <span className="room-info-answer">{props.room.timeUp}</span>
          </div>
          <div>
            <label className="room-info">Created at:</label>
            <span className="room-info-answer">
              {/* {props.room.createdAt.toLocaleString('en-SG')} */}
              {moment(props.room.createdAt).format('DD-MM-YYYY HH:mm:ss')}
            </span>
          </div>
        </Card.Text>
        <Button className="play-button">Play</Button>
      </Card.Body>
    </Card>
  );
};

export default Room;
