import { dataTitleSlice } from '../DataTitle/dataTitleSlice';
import { dataTableSlice } from './dataTableSlice';

export const asyncRequestDataTable = () => async (dispatch) => {
  try {
    const response = (await fetch('../../../public/data.json')).json();
    const [dataTitle, dataTable] = await response;

    dispatch(dataTableSlice.actions.dataTableRequestSuccess(dataTable));
    dispatch(dataTitleSlice.actions.dataTitleRequestSuccess(dataTitle));
  } catch (error) {
    dispatch(dataTableSlice.actions.dataTableRequestError(error));
  }
};
