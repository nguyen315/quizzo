import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import SearchBar from '../components/room/searchBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Row, Col, Card } from 'react-bootstrap';

import Room from '../components/room/room';
import AddRoom from '../components/room/AddRoom';

import '../css/room/room.css';
import '../css/room/searchbar.css';
import { fetchRooms } from '../store/slices/rooms.slice';
import LoggedInNavBar from '../components/layouts/LoggedInNavBar';

const ListRooms: React.FC = () => {
  const rooms = useSelector((state: RootState) => state.rooms.rooms);

  const roomsStatus = useSelector((state: RootState) => state.rooms.status);
  const roomsError = useSelector((state: RootState) => state.rooms.error);

  const dispatch = useDispatch();

  let content: any;
  if (roomsStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (roomsStatus === 'succeeded') {
    console.log(rooms);
    content = rooms.map((room) => <Room key={room.id} room={room} />);
    console.log(content);
  } else if (roomsStatus === 'failed') {
    content = <div>{roomsError}</div>;
  }

  useEffect(() => {
    if (roomsStatus === 'idle') {
      dispatch(fetchRooms());
    }
  }, [roomsStatus, dispatch]);

  return (
    <Container fluid>
      <LoggedInNavBar />
      <SearchBar />
      {/* <div> {content}</div> */}

      <Row xs={1} md={2} lg={4} className="list-room">
        {Array.from({ length: 1 }).map((_, idx) => (
          <Col>
            <AddRoom />
          </Col>
        ))}
        {content}
        {/* {Array.from({ length: 4 }).map((_, idx) => (
          <Col>{content}</Col>
        ))} */}
      </Row>
    </Container>
  );
};

export default ListRooms;
