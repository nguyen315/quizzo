import React from 'react';
import Question from '../components/question/Question';
import { Container } from 'react-bootstrap';
import MyNavbar from '../components/layouts/MyNavbar';
import SearchBar from '../components/question/SearchBar';

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
    ],
    image: ''
  },
  {
    id: 2,
    user_id: 1,
    title: 'Question title #2',
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
    ],
    image: ''
  }
];

const ListQuestions: React.FC = (props: any) => {
  return (
    <>
      <MyNavbar />
      <SearchBar />
      {data.map((question) => (
        <Question question={question} />
      ))}
    </>
  );
};

export default ListQuestions;
