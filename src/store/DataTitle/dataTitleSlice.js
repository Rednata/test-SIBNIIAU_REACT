import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dataTitle: [],
  upTitles: {},
  hiddenList: [],
  error: false,
};

export const dataTitleSlice = createSlice({
  name: 'dataTitle',
  initialState,
  reducers: {
    dataTitleRequest: () => {

    },
    dataTitleRequestSuccess: (state, action) => {
      state.dataTitle = action.payload;
      // state.typeTitle = action.payload[1];
    },
    dataTitleRequestError: (state, action) => {
      state.dataTitle = [];
      state.error = action.payload;
    },
    changeArrowUpTitle: (state, action) => {
      state.upTitles = action.payload;
    },
    hiddenTitleColumns: (state, action) => {
      state.hiddenList = action.payload;
    },
    updateDataTitleColumn: (state, action) => {
      state.dataTitle = [...state.dataTitle, action.payload];
    },
    deleteDataTitleColumn: (state, action) => {
      state.dataTitle = action.payload;
    }
  }
});

export default dataTitleSlice.reducer;
