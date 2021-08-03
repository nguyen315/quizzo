import { Formik, Field, validateYupSchema } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  FormControl,
  Row,
  Form
} from 'react-bootstrap';
import * as Yup from 'yup';
import InputRange from 'react-input-range';
import '../css/room/createrooms.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchQuestions } from '../store/slices/questions.slice';
import LoggedInNavBar from '../components/layouts/LoggedInNavBar';
import Question from '../components/question/Question';
import { createRoom } from '../store/slices/rooms.slice';

const CreateRoom: React.FC = () => {
  const questions = useSelector(
    (state: RootState) => state.questions.questions
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handlerSubmit = (values: any) => {
    let questionsList: number[] = [];
    for (const question of values.questions) {
      questionsList.push(parseInt(question));
    }
    const createRoomRequest = {
      name: values.name,
      timeUp: values.timeUp,
      level: values.level,
      questions: questionsList
    };
    dispatch(createRoom(createRoomRequest));
  };

  const [checked, setChecked] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, 'Room name must have at least 5 characters!')
      .max(30, "Room name can't be longer than 30 characters!")
      .required('Room name is required'),
    timeUp: Yup.number()
      .min(1, "Time up can'be negative")
      .required('Default time per question is 15sec.')
  });

  const [value, setValue] = React.useState(10);

  return (
    <>
      <LoggedInNavBar />
      <div id="create-room">
        <Formik
          initialValues={{
            name: '',
            timeUp: '',
            level: 0,
            questions: []
          }}
          validationSchema={validationSchema}
          onSubmit={handlerSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleChange,
            handleBlur,
            setFieldValue
          }) => (
            <>
              <h1 className="title">Create a new room</h1>
              <Form onSubmit={handleSubmit}>
                <Row className="align-items-center">
                  <Col xs="9">
                    <Form.Group>
                      <Form.Label>Room name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter room name"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        required
                      />
                      {touched['name'] && errors['name'] && (
                        <Form.Text>{errors['name']}</Form.Text>
                      )}
                    </Form.Group>
                  </Col>

                  <Col xs="auto">
                    <Form.Group>
                      <Form.Label>Time per question</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="15"
                        name="timeUp"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.timeUp}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Row className="align-items-center">
                    <Col xs="2">
                      <Form.Label>Level</Form.Label>
                    </Col>
                  </Row>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={10}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="level"
                    value={values.level}
                  />
                  {JSON.stringify(values.level)}
                  <Form.Text>0-30: Easy, 31-50: Medium, 51-100: Hard</Form.Text>
                </Form.Group>
                <Form.Label>
                  Choose one or more question for your room!
                </Form.Label>
                <div className="questions-container">
                  {questions.map((question) => (
                    <div role="group" aria-labelledby="checkbox-group">
                      <span>
                        <Field
                          type="checkbox"
                          name="questions"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          key={question.id}
                          value={question.id.toString()}
                        />
                      </span>
                      <span> {question.title}</span>
                    </div>
                  ))}{' '}
                  <br />
                </div>
                <Button className="btn-save" variant="primary" type="submit">
                  Save
                </Button>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CreateRoom;
