import { dataTitleSlice } from './dataTitleSlice';

export const asyncRequestDataTitle = () => async (dispatch) => {
  try {
    const response = (await fetch('../../../public/dataTitle.json')).json();
    const data = await response;

    dispatch(dataTitleSlice.actions.dataTitleRequestSuccess(data));
  } catch (error) {
    dispatch(dataTitleSlice.actions.dataTitleRequestError(error));
  }
};
