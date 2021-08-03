import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { apiUrl } from '../types';

interface State {
  rooms: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: State = {
  rooms: [],
  status: 'idle',
  error: null
};

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  const respone = await axios.get(`${apiUrl}/rooms`);
  return respone.data;
});

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRooms.pending.toString()]: (state, action) => {
      state.status = 'loading';
    },
    [fetchRooms.fulfilled.toString()]: (state, action) => {
      state.status = 'succeeded';
      state.rooms = state.rooms.concat(action.payload.rooms);
    },
    [fetchRooms.rejected.toString()]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
});

export const createRoom = createAsyncThunk(
  '/rooms/createRoom',
  async (createRoomRequest: any) => {
    try {
      const response = await axios.post(`${apiUrl}/rooms`, createRoomRequest);
      if (response.data.success) {
        alert(
          'Create room success fully\nPlease go back to Room to see the result!'
        );
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export default roomsSlice.reducer;
export const {} = roomsSlice.actions;
