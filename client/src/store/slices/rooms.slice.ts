import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Component } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { idText } from 'typescript';
import { apiUrl } from '../types';

interface State {
  rooms: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  totalPage: any;
  totalRoom: any;
}

const initialState: State = {
  rooms: [],
  status: 'idle',
  error: null,
  totalPage: null,
  totalRoom: null
};

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  const respone = await axios.get(`${apiUrl}/rooms`);
  return respone.data;
});

export const createRoom = createAsyncThunk(
  '/rooms/createRoom',
  async (createRoomRequest: any) => {
    try {
      const response = await axios.post(`${apiUrl}/rooms`, createRoomRequest);
      if (response.data.success) {
        alert(`Create room successfully`);
        return response.data.room;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteRoom = createAsyncThunk('rooms/:id', async (id: any) => {
  try {
    const response = await axios.delete(`${apiUrl}/rooms/${id}`);
    if (response.data.success) {
      return id;
    }
  } catch (error) {
    console.log(error);
  }
});

export const getRoomByPage = createAsyncThunk(
  'rooms/paginate/page',
  async (page: any) => {
    try {
      const response = await axios.get(
        `${apiUrl}/rooms/paginate?page=${page}&limit=11`
      );
      const totalPage = response.data.meta.totalPages;
      return {
        rooms: response.data.items,
        lengthRooms: response.data.items.length,
        totalPage: totalPage
      };
    } catch (error) {}
  }
);

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: {
    [createRoom.fulfilled.toString()]: (state, action) => {
      state.status = 'succeeded';
      if (state.totalRoom < 11) state.rooms = [...state.rooms, action.payload];
    },

    [getRoomByPage.fulfilled.toString()]: (state, action) => {
      state.status = 'succeeded';
      state.rooms = action.payload.rooms;
      state.totalRoom = action.payload.lengthRooms;
      state.totalPage = action.payload.totalPage;
    },

    [deleteRoom.fulfilled.toString()]: (state, action) => {
      state.rooms = state.rooms.filter(
        (room: any) => room.id !== action.payload
      );
    }
  }
});

export default roomsSlice.reducer;
export const {} = roomsSlice.actions;
