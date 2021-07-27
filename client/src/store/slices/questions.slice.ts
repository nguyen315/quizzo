import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../types';

interface State {
  questions: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: State = {
  questions: [],
  status: 'idle',
  error: null
};

export const fetchQuestions = createAsyncThunk(
  '/questions/fetchQuestions',
  async () => {
    const respone = await axios.get(`${apiUrl}/questions`);
    return respone.data;
  }
);

export const createQuestion = createAsyncThunk(
  '/questions/createQuestion',
  async (questionForm: any) => {
    console.log(questionForm);
    const response = await axios.post(`${apiUrl}/questions`, questionForm);
    if (response.data.success) {
      return response.data.createdQuestion;
    }
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
      // Add any fetched questions to the array
      state.questions = action.payload.questions;
    },
    [fetchQuestions.rejected.toString()]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    // Create question
    [createQuestion.fulfilled.toString()]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched questions to the array
      console.log(action.payload);
      state.questions = [...state.questions, action.payload];
    }
  }
});

export default questionsSlice.reducer;
export const {} = questionsSlice.actions;
