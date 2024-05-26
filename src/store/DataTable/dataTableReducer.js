import { dataTableSlice } from './dataTableSlice';

export const asyncRequestDataTable = () => async (dispatch) => {
  try {
    const response = (await fetch('../../../public/data.json')).json();
    const data = await response;

    dispatch(dataTableSlice.actions.dataTableRequestSuccess(data));
  } catch (error) {
    dispatch(dataTableSlice.actions.dataTableRequestError(error));
  }
};
