import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../types';

interface State {
  paginateQuestion: any[];
  questions: any[];
  totalQuestion: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  totalPage: any;
}

const initialState: State = {
  paginateQuestion: [],
  questions: [],
  totalQuestion: null,
  status: 'idle',
  error: null,
  totalPage: null
};

export const fetchQuestions = createAsyncThunk(
  '/questions/fetchQuestions',
  async () => {
    const response = await axios.get(`${apiUrl}/questions`);
    return response.data;
  }
);

export const createQuestion = createAsyncThunk(
  '/questions/createQuestion',
  async (questionForm: any) => {
    try {
      const response = await axios.post(`${apiUrl}/questions`, questionForm);
      if (response.data.success) {
        return response.data.question;
      }
    } catch (error) {}
  }
);

export const uploadImage = createAsyncThunk(
  'questions/upload',
  async (formData: any) => {
    try {
      await axios.post(`${apiUrl}/questions/upload`, formData);
    } catch (error) {}
  }
);

export const getQuestionByPage = createAsyncThunk(
  'questions/paginate/page',
  async (page: any) => {
    try {
      const response = await axios.get(
        `${apiUrl}/questions/paginate?page=${page}&limit=10`
      );
      let questions_res = [];
      let lengthQuestions = 0;
      for (let idx in response.data.content) {
        try {
          if (response.data.content[idx] !== null)
            questions_res[parseInt(idx)] = response.data.content[idx];
          else {
            lengthQuestions = response.data.content['total'];
          }
        } catch (error) {
          console.log(error);
          break;
        }
      }
      return { questions_res, lengthQuestions };
    } catch (error) {}
  }
);

export const getQuestionFirstPage = createAsyncThunk(
  'questions/paginate',
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/questions/paginate`);
      let questions_res = [];
      let lengthQuestions = 0;
      for (let idx in response.data.content) {
        if (response.data.content[idx] !== null)
          questions_res[parseInt(idx)] = response.data.content[idx];
        else {
          lengthQuestions = response.data.content['total'];
        }
      }
      const totalPage = response.data.totalPage;
      return { questions_res, totalPage, lengthQuestions };
    } catch (error) {}
  }
);

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchQuestions.pending.toString()]: (state, action) => {
      state.status = 'loading';
    },
    [fetchQuestions.fulfilled.toString()]: (state, action) => {
      state.status = 'succeeded';
      state.questions = action.payload.questions;
    },
    [fetchQuestions.rejected.toString()]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    // Create question
    [createQuestion.fulfilled.toString()]: (state, action) => {
      state.status = 'succeeded';
      state.questions = [...state.questions, action.payload];
    },

    // Pagination question
    [getQuestionByPage.fulfilled.toString()]: (state, action) => {
      state.status = 'succeeded';
      state.paginateQuestion = action.payload.questions_res;
      state.totalQuestion = action.payload.lengthQuestions;
    },
    [getQuestionFirstPage.fulfilled.toString()]: (state, action) => {
      state.status = 'succeeded';
      state.paginateQuestion = action.payload.questions_res;
      state.totalQuestion = action.payload.lengthQuestions;
      state.totalPage = action.payload.totalPage;
    }
  }
});

export default questionsSlice.reducer;
export const {} = questionsSlice.actions;
