import React, { useEffect } from 'react';
import Question from '../components/question/Question';
import { Container } from 'react-bootstrap';
import MyNavbar from '../components/layouts/MyNavbar';
import SearchBar from '../components/question/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchQuestions } from '../store/slices/questions.slice';
import AddQuestionModal from '../components/question/AddQuestionModal';

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
  }, [questionsStatus, dispatch]);

  return (
    <>
      <Container fluid>
        <MyNavbar />
        <SearchBar />
        {content}
      </Container>
      <AddQuestionModal />
    </>
  );
};

export default ListQuestions;
