import React, { useEffect, useState } from 'react';
import Question from '../components/question/Question';
import { Container } from 'react-bootstrap';
import SearchBar from '../components/question/SearchBar';
import FilterBar from '../components/question/FilterBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  fetchQuestions,
  getQuestionFirstPage,
  getQuestionByPage
} from '../store/slices/questions.slice';
import LoggedInNavBar from '../components/layouts/LoggedInNavBar';
import AddQuestionModal from '../components/question/AddQuestionModal';
import '../css/questions/question.css';
import '../css/questions/listQuestion.css';
import Pagination from 'react-bootstrap/Pagination';
import '../css/pagination.css';
import CountDown from '../components/layouts/CountDown';

const ListQuestions: React.FC = () => {
  const questions = useSelector(
    (state: RootState) => state.questions.questions
  );
  const totalQuestion = useSelector(
    (state: RootState) => state.questions.totalQuestion
  );
  const totalPage = useSelector(
    (state: RootState) => state.questions.totalPage
  );
  const questionsStatus = useSelector(
    (state: RootState) => state.questions.status
  );
  const questionsError = useSelector(
    (state: RootState) => state.questions.error
  );

  const questionPageinate = useSelector(
    (state: RootState) => state.questions.paginateQuestion
  );

  const [pageNumber, setPageNumber] = useState(0);

  const dispatch = useDispatch();

  let content;
  if (questionsStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (questionsStatus === 'succeeded') {
    content = questionPageinate.map((question) => (
      <Question key={question.id} question={question} />
    ));
  } else if (questionsStatus === 'failed') {
    content = <div>{questionsError}</div>;
  }

  useEffect(() => {
    dispatch(getQuestionFirstPage());
  }, [dispatch]);
  const [currentPage, setCurrentPage] = useState(1);

  const goFirstPage = () => {
    dispatch(getQuestionByPage(1));
    setCurrentPage(1);
  };
  const goLastPage = () => {
    dispatch(getQuestionByPage(totalPage));
    setCurrentPage(totalPage);
  };

  const goPrePage = () => {
    if (currentPage !== 1) {
      dispatch(getQuestionByPage(currentPage - 1));
      setCurrentPage(currentPage - 1);
    }
  };

  const goNextPage = () => {
    if (currentPage !== totalPage) {
      dispatch(getQuestionByPage(currentPage + 1));
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClickPage = (page: number) => {
    dispatch(getQuestionByPage(page));
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

  return (
    <>
      <Container fluid="lg">
        <LoggedInNavBar />
        <div className="btn-create">
          <AddQuestionModal />
        </div>
        <div>
          <span className="title question-list-title">Question List</span>
        </div>
        <div className="mt-3 search-filter-bar">
          <SearchBar />
          <FilterBar />
        </div>

        {content}
      </Container>
      <Pagination className="item">
        <Pagination.Prev onClick={goPrePage} />
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
        )}
        <Pagination.Next onClick={goNextPage} />
      </Pagination>
    </>
  );
};

export default ListQuestions;
