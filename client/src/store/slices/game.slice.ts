import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../types';

interface State {
  roomId: string | undefined;
  timeUp: number;
  roomName: string | undefined;
  role: 'host' | 'player' | undefined;
  userId: string | undefined;
  username: string | undefined;
  players: any[];
  question: any | null;
  answerStatus: 'done' | 'not done' | 'rank' | 'end';
}

const initialState: State = {
  roomId: undefined,
  timeUp: 0,
  roomName: undefined,
  role: undefined,
  userId: undefined,
  username: undefined,
  players: [],
  question: null,
  answerStatus: 'not done'
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateGame: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
    updatePlayers: (state, action) => {
      state.players = action.payload;
    },
    updateQuestion: (state, action) => {
      state.question = action.payload.question;
    },
    updateAnswerStatus: (state, action) => {
      state.answerStatus = action.payload.status;
    },
    endGame: (state) => {
      state.roomId = undefined;
      state.timeUp = 0;
      state.role = undefined;
      state.userId = undefined;
      state.username = undefined;
      state.players = [];
      state.question = null;
      state.answerStatus = 'end';
    }
  },
  extraReducers: {}
});

export default gameSlice.reducer;
export const {
  updateGame,
  updatePlayers,
  updateQuestion,
  updateAnswerStatus,
  endGame
} = gameSlice.actions;
