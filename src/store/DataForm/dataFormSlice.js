import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dataForm: {},

};

export const dataFormSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    getDataForm: (state, action) => {
      state.dataForm = { ...state.dataForm, ...action.payload };
    },

  }
});

export default dataFormSlice.reducer;
