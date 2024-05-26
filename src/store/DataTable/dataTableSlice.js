import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  error: false,
};

export const dataTableSlice = createSlice({
  name: 'dataTable',
  initialState,
  reducers: {
    dataTableRequest: (state) => {
      state.error = '';
    },
    dataTableRequestSuccess: (state, action) => {
      state.data = action.payload;
      state.error = '';
    },
    dataTableRequestError: (state, action) => {
      state.data = [];
      state.error = action.payload;
    },
    dataTableSorted: (state, action) => {
      state.data = action.payload;
      state.error = '';
    },
    updateDataTable: (state, action) => {
      state.data = action.payload;
    },
    updateDataTableColumn: (state, action) => {
      const dataPayload = action.payload[0];
      const field = action.payload[1];
      const dataCurrent = [...state.data];
      const data = dataCurrent
        .map((elem, i) => ({ ...elem, [field]: dataPayload[i] }));
      state.data = data;
    },
    deleteDataTableColumn: (state, action) => {
      state.data = action.payload;
    }
  }
});

export default dataTableSlice.reducer;
