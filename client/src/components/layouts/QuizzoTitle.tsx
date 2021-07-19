import React from 'react';
import { Container, Row } from 'react-bootstrap';
import '../../css/landing/quizzo-title.css';

const QuizzoTitle: React.FC = () => {
  return (
    <Container
      fluid="md"
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <Row>
        <div id="quizzo-title" className="title">
          Quizzo
        </div>
      </Row>
      <Row>
        <div className="intro">
          Unleash the fun in classrooms, offices, and living rooms!
          <svg
            id="scratch-position"
            width="215"
            height="63"
            viewBox="0 0 215 63"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="intro-scratch"
              d="M15.6996 23.7484C13.4642 29.9092 8.10005 40.7664 13.0017 47.0405C17.1333 52.329 24.7484 45.9323 28.3799 43.2634C37.3607 36.663 45.9038 29.0573 53.6055 21.0055C55.491 19.0343 62.6173 9.05274 66.5106 11.3379C70.7818 13.845 70.7265 24.1238 71.097 28.2C71.7159 35.0075 70.2054 43.3831 73.1655 49.7384C76.0221 55.8718 82.2533 45.1712 83.6874 42.9936C89.4347 34.2661 94.3334 24.8059 102.123 17.6331C115.87 4.97514 120.675 24.8905 123.347 35.7991C124.555 40.7323 125.164 46.3284 131.576 44.9721C139.385 43.3201 145.752 36.3377 150.056 30.0435C153.193 25.4564 156.577 15.3541 162.107 13.0916C165.103 11.8661 168.084 24.4298 168.852 26.1765C171.909 33.1283 175.522 40.16 183.915 40.8353C192.028 41.488 198.768 38.1684 204.285 32.6515"
              stroke="#FD8927"
              stroke-opacity="0.95"
              stroke-width="21"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </Row>
    </Container>
  );
};

export default QuizzoTitle;
