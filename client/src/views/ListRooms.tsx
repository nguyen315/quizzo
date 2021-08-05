import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SearchBar from '../components/room/searchBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Row, Col, Card, Pagination } from 'react-bootstrap';

import Room from '../components/room/room';
import AddRoom from '../components/room/AddRoom';

import '../css/room/room.css';
import '../css/room/searchbar.css';
import { fetchRooms, getRoomByPage } from '../store/slices/rooms.slice';
import LoggedInNavBar from '../components/layouts/LoggedInNavBar';
import { Link } from 'react-router-dom';

const ListRooms: React.FC = () => {
  const rooms = useSelector((state: RootState) => state.rooms.rooms);
  const totalPage = useSelector((state: RootState) => state.rooms.totalPage);
  const totalRoom = useSelector((state: RootState) => state.rooms.totalRoom);
  const roomsStatus = useSelector((state: RootState) => state.rooms.status);
  const roomsError = useSelector((state: RootState) => state.rooms.error);

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  let content = rooms.map((room) => (
    <Col>
      <Room key={room.id} room={room} currentPage={currentPage} />
    </Col>
  ));

  useEffect(() => {
    dispatch(getRoomByPage(1));
  }, [dispatch]);

  const goFirstPage = () => {
    dispatch(getRoomByPage(1));
    setCurrentPage(1);
  };
  const goLastPage = () => {
    dispatch(getRoomByPage(totalPage));
    setCurrentPage(totalPage);
  };

  const goPrePage = () => {
    if (currentPage !== 1) {
      dispatch(getRoomByPage(currentPage - 1));
      setCurrentPage(currentPage - 1);
    }
  };

  const goNextPage = () => {
    if (currentPage !== totalPage) {
      dispatch(getRoomByPage(currentPage + 1));
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClickPage = (page: number) => {
    dispatch(getRoomByPage(page));
    setCurrentPage(page);
  };

  let paginationPage = null;
  if (currentPage === 1) {
    paginationPage = [currentPage, currentPage + 1, currentPage + 2].map(
      (page, index) => (
        <span key={index}>
          <Pagination.Item
            active={page === currentPage}
            onClick={() => handleClickPage(page)}
          >
            {page}
          </Pagination.Item>
        </span>
      )
    );
  } else if (currentPage === totalPage) {
    paginationPage = [currentPage - 2, currentPage - 1, currentPage].map(
      (page, index) => (
        <span key={index}>
          <Pagination.Item
            active={page === currentPage}
            onClick={() => handleClickPage(page)}
          >
            {page}
          </Pagination.Item>
        </span>
      )
    );
  } else {
    paginationPage = [currentPage - 1, currentPage, currentPage + 1].map(
      (page, index) => (
        <span key={index}>
          <Pagination.Item
            active={page === currentPage}
            onClick={() => handleClickPage(page)}
          >
            {page}
          </Pagination.Item>
        </span>
      )
    );
  }
  let paginatePage = null;
  if (totalPage === 1 || totalPage === 0) {
    paginatePage = (
      <Pagination.Item
        active={1 === currentPage}
        onClick={() => handleClickPage(1)}
      >
        1
      </Pagination.Item>
    );
  } else if (totalPage === 2) {
    paginatePage = (
      <>
        {' '}
        <Pagination.Item
          active={1 === currentPage}
          onClick={() => handleClickPage(1)}
        >
          1
        </Pagination.Item>
        <Pagination.Item
          active={2 === currentPage}
          onClick={() => handleClickPage(2)}
        >
          2
        </Pagination.Item>
      </>
    );
  } else {
    paginatePage = (
      <>
        {currentPage > 2 && totalPage > 3 && (
          <>
            {' '}
            <Pagination.Item onClick={goFirstPage}>{1}</Pagination.Item>{' '}
            <Pagination.Ellipsis />
          </>
        )}
        {paginationPage}
        {currentPage < totalPage - 1 && totalPage > 3 && (
          <>
            {' '}
            <Pagination.Ellipsis />
            <Pagination.Item onClick={goLastPage}>{totalPage}</Pagination.Item>
          </>
        )}{' '}
      </>
    );
  }

  return (
    <>
      <LoggedInNavBar />

      <Container fluid>
        <SearchBar />

        <Row xs={1} md={2} lg={4} className="list-room">
          {Array.from({ length: 1 }).map((_, idx) => (
            <Col>
              <Link to="/create-room">
                <AddRoom />
              </Link>
            </Col>
          ))}
          {content}
        </Row>
      </Container>
      <Pagination className="item">
        <Pagination.Prev onClick={goPrePage} />
        {paginatePage}
        <Pagination.Next onClick={goNextPage} />
      </Pagination>
    </>
  );
};

export default ListRooms;
