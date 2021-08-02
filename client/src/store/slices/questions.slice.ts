import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../types';

interface State {
  paginateQuestion: any[];
  questions: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: State = {
  paginateQuestion: [],
  questions: [],
  status: 'idle',
  error: null
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
  'questions/paginate',
  async (page: any) => {
    try {
      const response = await axios.get(
        `${apiUrl}/questions/paginate?page=${page}&limit=5`
      );
      return response.data;
    } catch (error) {}
  }
);

export const getQuestionFirstPage = createAsyncThunk(
  'questions/paginate',
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/questions/paginate`);
      let questions_res = [];
      let i = 0;
      for (const idx in response.data.content) {
        try {
          questions_res[i] = response.data.content[i];
          i += 1;
        } catch (error) {
          break;
        }
      }
      return questions_res;
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
      state.paginateQuestion = [
        ...state.paginateQuestion,
        action.payload.content
      ];
    },
    [getQuestionFirstPage.fulfilled.toString()]: (state, action) => {
      state.status = 'succeeded';
      console.log(typeof action.payload);
      state.paginateQuestion = action.payload;
    }
  }
});

export default questionsSlice.reducer;
export const {} = questionsSlice.actions;
