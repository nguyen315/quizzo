import React, { useEffect } from 'react';
import Question from '../components/question/Question';
import { Container } from 'react-bootstrap';
import MyNavbar from '../components/layouts/MyNavbar';
import SearchBar from '../components/question/SearchBar';
import FilterBar from '../components/question/FilterBar';
import CreateQuestionForm from '../components/question/CreateQuestionForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchQuestions } from '../store/slices/questions.slice';
import '../css/questions/listQuestion.css';

const data = [
  {
    id: 1,
    userId: 1,
    title: 'Question title 1',
    image: '',
    type: '',
    createdAt: '',
    updatedAt: new Date(),
    tags: [
      {
        id: 1,
        title: 'Algorithm'
      },
      {
        id: 2,
        title: 'Cybozu'
      }
    ],
    answers: [
      {
        id: 1,
        content: 'Lorem  ru sius. Sed sit amet ultricies magna.',
        isCorrect: false,
        createdAt: '',
        updatedAt: ''
      },
      {
        id: 1,
        content: 'Answer B of question 1',
        isCorrect: false,
        createdAt: '',
        updatedAt: ''
      },
      {
        id: 1,
        content: 'Answer C of question 1',
        isCorrect: false,
        createdAt: '',
        updatedAt: ''
      },
      {
        id: 1,
        content: 'Answer D of question 1',
        isCorrect: true,
        createdAt: '',
        updatedAt: ''
      }
    ]
  }
];

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

  // fake data to display UI first, delete this assignment to load real data
  content = data.map((question) => (
    <Question key={question.id} question={question} />
  ));
  console.log(content);

  return (
    <Container fluid="lg">
      <MyNavbar />

      <div>
        <span className="title question-list-title">Question List</span>
      </div>
      <div className="mt-3 search-filter-bar">
        <SearchBar />
        <FilterBar />
      </div>

      {content}
    </Container>
  );
};

export default ListQuestions;
