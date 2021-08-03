import { Formik, Field } from 'formik';
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
import RangeSlider from 'react-bootstrap-range-slider';
import '../css/room/createrooms.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchQuestions } from '../store/slices/questions.slice';
import LoggedInNavBar from '../components/layouts/LoggedInNavBar';

const CreateRoom: React.FC = () => {
  const questions = useSelector(
    (state: RootState) => state.questions.questions
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handlerSubmit = (values: any) => {
    console.log(values);
  };

  const [checked, setChecked] = useState(false);

  const handleChecked = () => {
    setChecked(!checked);
  };

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
            toggle: false,
            questions: []
          }}
          validationSchema={validationSchema}
          onSubmit={handlerSubmit}
        >
          {({
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
                    <RangeSlider
                      value={value}
                      onChange={(e: any) => {
                        setValue(e.target.value);
                      }}
                      step={10}
                    />
                  </Row>
                  <Form.Text>0-30: Easy, 31-50: Medium, 51-100: Hard</Form.Text>
                </Form.Group>
                <div className="questions-container">
                  {questions.map((question) => (
                    <div role="group" aria-labelledby="checkbox-group">
                      <span>
                        <Field
                          type="checkbox"
                          name="questions"
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
