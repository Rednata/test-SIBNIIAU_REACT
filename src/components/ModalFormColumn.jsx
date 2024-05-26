import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { dataTableSlice } from '../store/DataTable/dataTableSlice';
import { dataTitleSlice } from '../store/DataTitle/dataTitleSlice';
import { generateRandomKey } from '../utils/generateRandomKey';

export const ModalFormColumn = ({ showForm, setShowForm }) => {
  const countCells = useSelector(state => state.dataTable.data).length;

  const dispatch = useDispatch();
  const formRef = useRef();
  const [selectValue, setSelectValue] = useState('string');

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const inputs = Array.from(formRef.current.querySelectorAll('input'));
    const field = inputs[0].value;
    const inputsValue = inputs.slice(1).map(elem => {
      if (selectValue === 'boolean') {
        return elem.checked;
      }
      return elem.value;
    });
    const inputsTitle = { field, 'type': selectValue };

    dispatch(
      dataTableSlice.actions.updateDataTableColumn([inputsValue, field]));
    dispatch(dataTitleSlice.actions.updateDataTitleColumn(inputsTitle));
    setShowForm(false);
  };

  const overlayClick = ({ target }) => {
    if (!target.closest('.form')) {
      setShowForm(false);
    }
  };

  const handleChangeSelect = () => {
    const inputType = formRef.current.querySelector('select').value;
    setSelectValue(inputType);
  };

  const getInput = () => {
    const inputArrs = [];
    let type = '';
    for (let i = 0; i < countCells; i++) {
      switch (selectValue) {
        case 'boolean':
          type = 'checkbox';
          break;
        case 'number':
          type = 'number';
          break;
        default:
          type = 'text';
          break;
      }

      inputArrs.push(
        <label className='form__label' key={generateRandomKey()}>Строка {i + 1}
          <input type={type} />
        </label>);
    }
    return inputArrs;
  };

  return ReactDOM.createPortal(
    showForm &&
    <div className="overlay" onClick={overlayClick}>
      <form ref={formRef} className="form" onSubmit={handleSubmitForm}>
        <button
          className="form__close"
          type="button"
          onClick={() => setShowForm(false)}
        >
          &#x2716;
        </button>
        <p className="form__title">Введите данные</p>
        <label className='form__label'>Заголовок
          <input type="text" />
        </label>
        <div className="wrap-select">
          <span className='select__title'>Тип данных</span>
          <select className='select' onChange={handleChangeSelect}>
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
          </select>
        </div>

        {/* <Inputcolumn /> */}
        {getInput()}
        <button className="form__submit" type="submit">Done!</button>
      </form>
    </div>,
    document.getElementById('modal-form')
  );
};
