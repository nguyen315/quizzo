import React, { useEffect } from 'react';
import Question from '../components/question/Question';
import { Container } from 'react-bootstrap';
import MyNavbar from '../components/layouts/MyNavbar';
import SearchBar from '../components/question/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchQuestions } from '../store/slices/questions.slice';
import LoggedInNavBar from '../components/layouts/LoggedInNavBar';
import AddQuestionModal from '../components/question/AddQuestionModal';
import '../css/questions/question.css';

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

  return (
    <>
      <Container fluid>
        <LoggedInNavBar />
        <SearchBar />
        <div className="btn-create">
          <AddQuestionModal />
        </div>
        {content}
      </Container>
    </>
  );
};

export default ListQuestions;
