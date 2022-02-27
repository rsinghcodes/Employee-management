import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEmployees = createAsyncThunk(
  'employee/fetch',
  async (thunkAPI) => {
    try {
      const res = await axios.get('/api/employee/get-employees');

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createEmployee = createAsyncThunk(
  'employee/create',
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post('/api/employee/add-employee', userData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  'employee/delete',
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/api/employee/delete-employee/${id}`);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// update employee
export const updateEmployee = createAsyncThunk(
  'employee/update',
  async (userData, thunkAPI) => {
    try {
      const res = await axios.put(
        `/api/employee/update-employee/${userData._id}`,
        userData
      );

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    isLoading: false,
  },
  extraReducers: {
    [fetchEmployees.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.employees = payload.data;
    },
    [fetchEmployees.pending]: (state) => {
      state.isLoading = true;
    },
    [createEmployee.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.employees = [...state.employees, payload.data];
    },
    [createEmployee.pending]: (state) => {
      state.isLoading = true;
    },
    [updateEmployee.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.employees = state.employees.map((x) =>
        x._id == payload.data._id ? payload.data : x
      );
    },
    [updateEmployee.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteEmployee.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.employees = state.employees.filter(
        (x) => x._id !== payload.data._id
      );
    },
    [deleteEmployee.pending]: (state) => {
      state.isLoading = true;
    },
  },
});

export const employeeSelector = (state) => state.employee;

export default employeeSlice.reducer;
