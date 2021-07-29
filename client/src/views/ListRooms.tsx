import React, { useEffect } from 'react';
import Question from '../components/question/Question';
import { Container } from 'react-bootstrap';
import MyNavbar from '../components/layouts/MyNavbar';
import SearchBar from '../components/room/searchBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchQuestions } from '../store/slices/questions.slice';

import { Row, Col, Card } from 'react-bootstrap';

import Room from '../components/room/room';
import AddRoom from '../components/room/AddRoom';

import '../css/room/room.css';
import '../css/room/searchbar.css';

const ListRooms: React.FC = () => {
  return (
    <Container fluid>
      <MyNavbar />
      <SearchBar />
      {/* <div>// {content}</div> */}

      <Row xs={1} md={2} lg={4} className="list-room">
        {Array.from({ length: 1 }).map((_, idx) => (
          <Col>
            <AddRoom />
          </Col>
        ))}

        {Array.from({ length: 8 }).map((_, idx) => (
          <Col>
            <Room />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListRooms;
