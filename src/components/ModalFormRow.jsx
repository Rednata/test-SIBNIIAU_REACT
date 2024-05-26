import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { generateRandomKey } from '../utils/generateRandomKey';
import { useRef } from 'react';
import { Input } from './Input';
import { dataTableSlice } from '../store/DataTable/dataTableSlice';

export const ModalFormRow = ({ showForm, setShowForm }) => {
  const dataTitle = useSelector(state => state.dataTitle.dataTitle);
  const data = useSelector(state => state.dataTable.data);
  const dispatch = useDispatch();
  const formRef = useRef();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const newData = dataTitle.reduce((acc, elem) => {
      const key = elem.field;
      let value;
      const currentInput = formRef.current.querySelector(`input[name=${key}`);

      if (currentInput.type === 'checkbox') {
        value = !!currentInput.checked;
      } else if (currentInput.type === 'number') {
        value = Number(currentInput.value);
      } else {
        value = currentInput.value;
      }
      acc = { ...acc, [key]: value };
      return acc;
    }, {});

    dispatch(dataTableSlice.actions.updateDataTable([...data, newData]));
    setShowForm(false);
  };

  const overlayClick = ({ target }) => {
    if (!target.closest('.form')) {
      setShowForm(false);
    }
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
        {
          dataTitle.map(({ field, type }) => (
            <Input field={field} type={type} key={generateRandomKey()}/>
          ))
        }
        <button className="form__submit" type="submit">Done!</button>
      </form>
    </div>,
    document.getElementById('modal-form')
  );
};

