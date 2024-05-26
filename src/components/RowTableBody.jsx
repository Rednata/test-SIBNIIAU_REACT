import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { generateRandomKey } from '../utils/generateRandomKey';
import { dataTableSlice } from '../store/DataTable/dataTableSlice';

export const RowTableBody = ({ elem, i }) => {
  const dataTable = useSelector(state => state.dataTable.data);
  const hiddenFields = useSelector(state => state.dataTitle.hiddenList);
  const dispatch = useDispatch();

  const handleDeleteRow = () => {
    const newDataTable = [...dataTable];
    newDataTable.splice(i, 1);
    dispatch(dataTableSlice.actions.updateDataTable(newDataTable));
  };

  return (
    <tr className="tr" >
      {
        Object.entries(elem).map(([key, value], i) => (
          !(hiddenFields.some(elem => elem === key)) &&
          <td className='td' key={generateRandomKey()} data-col={i}>{
            typeof value === 'boolean' ?
              value ? 'да' : 'нет' :
              value
          }</td>
        ))
      }
      <th className="th">
        <div className="th__box">
          <button
            className="btn__del"
            title='delete row'
            onClick={handleDeleteRow}
          > &#x2716;
          </button>

        </div>
      </th>
    </tr>);
};

RowTableBody.propTypes = {
  elem: PropTypes.object,
  i: PropTypes.number,
};
