import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { dataTableSlice } from '../store/DataTable/dataTableSlice';
import { dataTitleSlice } from '../store/DataTitle/dataTitleSlice';

export const InputLoad = () => {
  const [inputFile, setInputFile] = useState(null);
  const dispatch = useDispatch();

  const upload = async (file) => (
    new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => resolve(setInputFile(reader.result));
    })
  );

  const handleChangeFileInput = ({ target }) => {
    const file = target.files[0];
    upload(file);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (inputFile) {
      const data = JSON.parse(inputFile);
      const [dataTitle, dataTable] = data;
      dispatch(dataTableSlice.actions.loadDataTableFromOutside(dataTable));
      dispatch(dataTitleSlice.actions.loadDataTitleFromOutside(dataTitle));
    }
  };

  return (
    <form className='form__file' onSubmit={handleSubmitForm}>
      <p className='form__title'>Выбрать файл для загрузки</p>
      <label className='label__file'>Load File
        <input
          className='input__file'
          type="file"
          onChange={handleChangeFileInput}
        />
      </label>
      <button className='button'>OK!</button>
    </form>
  );
};
