import { configureStore } from '@reduxjs/toolkit';
import dataTableReducer from './DataTable/dataTableSlice';
import dataTitleReducer from './DataTitle/dataTitleSlice';
import dataFormReducer from './DataForm/dataFormSlice';

export const store = configureStore({
  reducer: {
    dataTable: dataTableReducer,
    dataTitle: dataTitleReducer,
    form: dataFormReducer,
  },

});

