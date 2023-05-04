import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ErrorType } from '../../types/errorTypes';

const initialState: ErrorType = {
  error: '',
};

export const errorSlice = createSlice({
  name: 'error',
  initialState: initialState,
  reducers: {
    setError: (state, action: PayloadAction<ErrorType>) => {
      state.error = action.payload.error;
    },
    
  },
});

export const { setError} =
  errorSlice.actions;

export default errorSlice.reducer;
