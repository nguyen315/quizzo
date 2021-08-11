import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faImage } from '@fortawesome/free-solid-svg-icons';
import '../../css/questions/addQuestion.css';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  createQuestion,
  uploadImage,
  getQuestionByPage
} from '../../store/slices/questions.slice';
import { RootState } from '../../store/store';

const AddQuestionModal = (props: { currentPage: number }) => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);

  const questionPageinate = useSelector(
    (state: RootState) => state.questions.paginateQuestion
  );

  const createStatus = useSelector(
    (state: RootState) => state.questions.createStatus
  );

  const clickCreate = () => {
    setShowForm(!showForm);
  };

  // function handle connect to redux
  const handlerSubmit = (values: any) => {
    const answers = [
      {
        content: values.answerA,
        isCorrect: values.picked === 'A'
      },
      {
        content: values.answerB,
        isCorrect: values.picked === 'B'
      },
      {
        content: values.answerC,
        isCorrect: values.picked === 'C'
      },
      {
        content: values.answerD,
        isCorrect: values.picked === 'D'
      }
    ];

    const questionForm = {
      title: values.title,
      tags: values.tags.split(' '),
      type: values.type,
      image: values.image.files !== undefined ? values.image.files[0].name : '',
      answers: answers
    };
    if (questionForm.image !== '') {
      const formData = new FormData();
      formData.append('image', values.image.files[0]);
      dispatch(uploadImage(formData));
    }
    dispatch(createQuestion(questionForm));
    if (questionPageinate.length > 10 && createStatus === true) {
      dispatch(getQuestionByPage(props.currentPage));
    }
    setShowForm(false);
  };

  // Vadilation input
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, '*Title must have at least 2 characters')
      .max(100, "*Title can't be longer than 100 characters")
      .required('*Title is required'),
    answerA: Yup.string().required('*answerA is required'),
    answerB: Yup.string().required('*answerB is required'),
    answerC: Yup.string().required('*answerC is required'),
    answerD: Yup.string().required('*answerD is required')
  });

  return (
    <>
      <Formik
        initialValues={{
          title: '',
          image: '',
          tags: '',
          type: '1',
          answerA: '',
          answerB: '',
          answerC: '',
          answerD: '',
          picked: 'A'
        }}
        validationSchema={validationSchema}
        onSubmit={handlerSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isSubmitting
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Label onClick={clickCreate} className="form-title clickable">
              Create new question <AiOutlinePlus className="plus-icon" />
            </Form.Label>
            {showForm && (
              <>
                {' '}
                <Row>
                  <Col className="title-side" xs={12} lg={10}>
                    <Form.Label className="title-icon">
                      <FontAwesomeIcon icon={faEdit} />
                    </Form.Label>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="Title"
                        name="title"
                        className="title-input"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {touched['title'] && errors['title'] && (
                        <Form.Text className="errorText">
                          {errors['title']}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formFile">
                      <Row>
                        <Col className="image-side">
                          <Form.Label className="image-icon">
                            <FontAwesomeIcon icon={faImage} />
                          </Form.Label>
                          <Form.Label className="image-input">Image</Form.Label>
                        </Col>
                        <Col>
                          <Form.Control
                            type="file"
                            className="custom-file-input"
                            name="image"
                            onChange={(event) =>
                              setFieldValue('image', event.target)
                            }
                            onBlur={handleBlur}
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} lg={1}>
                    <Dropdown>
                      <Dropdown.Toggle className="btn-type" id="dropdown-basic">
                        Type
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>Action</Dropdown.Item>
                        <Dropdown.Item>Another action</Dropdown.Item>
                        <Dropdown.Item>Something else</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col xs={12} lg={10}>
                    <Form.Group>
                      <Form.Control
                        className="answer-input"
                        type="text"
                        placeholder="#Tag"
                        name="tags"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg={1}>
                    <label className="radio-input">
                      <input
                        type="radio"
                        value="A"
                        onChange={handleChange}
                        name="picked"
                        checked={values.picked === 'A'}
                      />{' '}
                      A
                    </label>
                  </Col>
                  <Col xs={11} lg={10}>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="Answer A"
                        name="answerA"
                        className="answer-input"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {touched['answerA'] && errors['answerA'] && (
                        <Form.Text className="errorText">
                          {errors['answerA']}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg={1}>
                    <label className="radio-input">
                      <input
                        type="radio"
                        value="B"
                        onChange={handleChange}
                        name="picked"
                        checked={values.picked === 'B'}
                      />{' '}
                      B
                    </label>
                  </Col>
                  <Col xs={11} lg={10}>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="Answer B"
                        name="answerB"
                        className="answer-input"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {touched['answerB'] && errors['answerB'] && (
                        <Form.Text className="errorText">
                          {errors['answerB']}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg={1}>
                    <label className="radio-input">
                      <input
                        type="radio"
                        value="C"
                        onChange={handleChange}
                        name="picked"
                        checked={values.picked === 'C'}
                      />{' '}
                      C
                    </label>
                  </Col>
                  <Col xs={11} lg={10}>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="Answer C"
                        name="answerC"
                        className="answer-input"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {touched['answerC'] && errors['answerC'] && (
                        <Form.Text className="errorText">
                          {errors['answerC']}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg={1}>
                    <label className="radio-input">
                      <input
                        type="radio"
                        value="D"
                        onChange={handleChange}
                        name="picked"
                        checked={values.picked === 'D'}
                      />{' '}
                      D
                    </label>
                  </Col>
                  <Col xs={11} lg={10}>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="Answer D"
                        name="answerD"
                        className="answer-input"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {touched['answerD'] && errors['answerD'] && (
                        <Form.Text className="errorText">
                          {errors['answerD']}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Button className="btn-save" variant="primary" type="submit">
                  Save
                </Button>
              </>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddQuestionModal;
