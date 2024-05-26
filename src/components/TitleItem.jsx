import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataTableSlice } from '../store/DataTable/dataTableSlice';
import { dataTitleSlice } from '../store/DataTitle/dataTitleSlice';

export const TitleItem = ({ field, type }) => {
  const dispatch = useDispatch();
  const dataTable = useSelector(state => state.dataTable.data);
  const dataTitle = useSelector(state => state.dataTitle.dataTitle);
  const upTitles = useSelector(state => state.dataTitle.upTitles);
  const hidden = useSelector(state => state.dataTitle.hiddenList);

  const [value, setValue] = useState('');

  const handleSortedTable = ({ target }) => {
    const isUpSorted = target.classList.contains('th__btn-sort_up');
    const dataSorted = [...dataTable];
    const field = target.closest('.th').getAttribute('data-field');

    if (type === 'number') {
      dataSorted.sort((data1, data2) => (isUpSorted ?
        (data1[field] - data2[field]) : (data2[field] - data1[field])));
    } else if (type === 'string') {
      dataSorted.sort((data1, data2) => (isUpSorted ?
          data1[field].localeCompare(data2[field]) :
          data2[field].localeCompare(data1[field])));
    } else if (type === 'boolean') {
      dataSorted.sort((data1, data2) => (isUpSorted ?
        String(data1[field]).localeCompare(String(data2[field])) :
        String(data2[field]).localeCompare(String(data1[field]))));
    }

    dispatch(dataTableSlice.actions.dataTableSorted(dataSorted));
    dispatch(dataTitleSlice.actions.changeArrowUpTitle(
      { [field]: !!isUpSorted }));
  };

  const handleHiddenColumn = ({ target }) => {
    const field = target.closest('.th').getAttribute('data-field');
    if (hidden.some(elem => elem === field)) {
      return;
    } else {
      dispatch(dataTitleSlice.actions.hiddenTitleColumns([...hidden, field]));
    }
  };

  const handleDelColumn = ({ target }) => {
    const field = target.closest('.th').getAttribute('data-field');
    const newDataTitle = dataTitle
      .filter(elem => elem.field.toLowerCase() !== field.toLowerCase());

    const tempDataTable = [...dataTable].map(elem => Object.entries(elem));
    const newDataTable = tempDataTable.map(elem => (
      elem.reduce((acc, item) => {
        if (item[0].toLowerCase() === field.toLowerCase()) {
          return acc;
        } else {
          const temp = { [item[0]]: item[1] };
          return ({ ...acc, ...temp });
        }
      }, {})
    ));

    dispatch(dataTitleSlice.actions.deleteDataTitleColumn(newDataTitle));
    dispatch(dataTableSlice.actions.deleteDataTableColumn(newDataTable));
  };

  const handleSearchColumn = ({ target }) => {
    setValue(target.value);
  };

  const handleSubmitColumn = (e) => {
    e.preventDefault();
  };

  return (
    <th className="th"
      data-type={type}
      data-field={field}
    >
      <button
        className='btn__del'
        onClick={handleDelColumn} title='delete Column'
      >
        &#x2716;
      </button>
      <div className="th__box">
        <button
          className='th__btn th__btn-hidden'
          title="Hidden column"
          onClick={handleHiddenColumn}>
        </button>
        <span className="th__title">{field}</span>
        <button
          className={upTitles[field] === true ?
            'th__btn th__btn-sort th__btn-sort_down' :
            'th__btn th__btn-sort th__btn-sort_up'
          }
          onClick={handleSortedTable}>
        </button>
      </div>
      <form onSubmit={handleSubmitColumn}>
        <input
          className="th__search"
          title='Search'
          onChange={handleSearchColumn}
          value={value}
          type="search"
        >
        </input>
      </form>

    </th>
  );
};

TitleItem.propTypes = {
  field: PropTypes.string,
  type: PropTypes.string,
};
