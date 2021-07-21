import { createSlice } from '@reduxjs/toolkit';
import { User } from '../actions/actions';

interface State {
  user?: User | null;
  isAuthenticated?: boolean;
  authLoading?: boolean;
  showModal?: boolean;
  showRegisterModal?: boolean;
}

const initialState: State = {
  user: null,
  isAuthenticated: false,
  authLoading: true,
  showModal: false,
  showRegisterModal: false
};

const authSlices = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    showModal(state) {
      state.showModal = !state.showModal;
    },
    showRegisterModal(state) {
      state.showRegisterModal = !state.showRegisterModal;
    }
  }
});

export default authSlices.reducer;
export const { showModal, showRegisterModal } = authSlices.actions;
