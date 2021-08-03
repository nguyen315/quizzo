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
import * as ReactPaginate from 'react-paginate';

const ListQuestions: React.FC = () => {
  const questions = useSelector(
    (state: RootState) => state.questions.questions
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
    content = questions.map((question) => (
      <Question key={question.id} question={question} />
    ));
  } else if (questionsStatus === 'failed') {
    content = <div>{questionsError}</div>;
  }

  useEffect(() => {
    if (questionsStatus === 'idle') {
      dispatch(fetchQuestions());
    }
  }, [questionsStatus, dispatch, questions]);

  useEffect(() => {
    dispatch(getQuestionFirstPage());
  }, [dispatch]);

  let pageCount = Math.ceil(questions.length / 10);

  const changePage = ({ selected }: any) => {
    dispatch(getQuestionByPage(selected));
  };

  return (
    <>
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
    </>
  );
};

export default ListQuestions;
