import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const loginManager = createAsyncThunk(
  'manager/login',
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post('/api/manager/login', userData);
      const { accessToken } = res.data;
      localStorage.setItem('token', accessToken);
      // Decode token to get user data
      const decoded = jwt_decode(accessToken);
      // Return decoded user
      return decoded;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const registerManager = createAsyncThunk(
  'manager/register',
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post('/api/manager/register', userData);
      const { accessToken } = res.data;
      localStorage.setItem('token', accessToken);
      // Decode token to get user data
      const decoded = jwt_decode(accessToken);
      // Return decoded user
      return decoded;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: 'manager',
  initialState: {
    isLoading: false,
    isError: false,
    isAuthenticated: false,
    user: {},
    error: {},
  },
  reducers: {
    logout: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    setUser: (state, action) => {
      const accessToken = localStorage.getItem('token');
      if (accessToken != null) {
        state.user = jwt_decode(accessToken);
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: {
    [loginManager.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = payload;
    },
    [loginManager.pending]: (state) => {
      state.isLoading = true;
    },
    [loginManager.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.error = payload;
    },
    [registerManager.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = payload;
    },
    [registerManager.pending]: (state) => {
      state.isLoading = true;
    },
    [registerManager.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.error = payload;
    },
  },
});

export const { logout, setUser } = authSlice.actions;
export const managerSelector = (state) => state.auth;

export default authSlice.reducer;
