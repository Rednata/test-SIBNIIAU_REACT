import { asyncRequestDataTable } from '../store/DataTable/dataTableReducer';
// import { asyncRequestDataTitle } from '../store/DataTitle/dataTitleReducer';
import { useDispatch } from 'react-redux';

export const ButtonLoad = () => {
  const dispatch = useDispatch();

  const handleClickLoadData = () => {
    dispatch(asyncRequestDataTable());
    // dispatch(asyncRequestDataTitle());
  };

  return (
    <button
      className='button button_load'
      onClick={handleClickLoadData}>Load Table</button>
  );
};
