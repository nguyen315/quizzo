import React, { useEffect } from 'react';
import Question from '../components/question/Question';
import { Container } from 'react-bootstrap';
import MyNavbar from '../components/layouts/MyNavbar';
import SearchBar from '../components/question/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchQuestions } from '../store/slices/questions.slice';

interface Question {
  id: number;
  userIid: number;
  playerChoiceId: number;
  tagId?: number;
  answerId: number;
  title: string;
  image: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

const data = [
  {
    id: 1,
    user_id: 1,
    title: 'Question title #1',
    image: '',
    tagId: '1',
    answers: [
      {
        id: 1,
        title: 'answer #1',
        isChoice: false,
        createdAt: 123,
        updatedAt: 456
      },
      {
        id: 2,
        title: 'answer #2',
        isChoice: true,
        createdAt: 123,
        updatedAt: 456
      },
      {
        id: 3,
        title: 'answer #3',
        isChoice: false,
        createdAt: 123,
        updatedAt: 456
      },
      {
        id: 4,
        title: 'answer #4',
        isChoice: false,
        createdAt: 123,
        updatedAt: 456
      }
    ]
  },
  {
    id: 2,
    user_id: 1,
    title: 'Question title #2',
    image: '',
    tagId: '1',
    answers: [
      {
        id: 1,
        title: 'answer #1b',
        isChoice: false,
        createdAt: 123,
        updatedAt: 456
      },
      {
        id: 2,
        title: 'answer #2b',
        isChoice: true,
        createdAt: 123,
        updatedAt: 456
      },
      {
        id: 3,
        title: 'answer #3b',
        isChoice: false,
        createdAt: 123,
        updatedAt: 456
      },
      {
        id: 4,
        title: 'answer #4b',
        isChoice: false,
        createdAt: 123,
        updatedAt: 456
      }
    ]
  }
];

const ListQuestions: React.FC = (props: any) => {
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
    <Container fluid>
      <MyNavbar />
      <SearchBar />

      {questions.map((question) => (
        <Question question={question} />
      ))}
    </Container>
  );
};

export default ListQuestions;
