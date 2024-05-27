import './App.css';
import { ButtonAddRow } from './components/ButtonAddRow';
import { Table } from './components/Table';
import { useSelector } from 'react-redux';
import { ButtonLoad } from './components/ButtonLoad';
import { ButtonHiddenColumns } from './components/ButtonHiddenColumns';
import { ButtonSaveTable } from './components/ButtonSaveTable';
import { ButtonAddColumn } from './components/ButtonAddColumn';
import { InputLoad } from './components/InputLoad';

const App = () => {
  const dataTable = useSelector(state => state.dataTable.data);
  const dataTitle = useSelector(state => state.dataTitle.dataTitle);

  return (
    <div className="container">
      <div id="modal-form"></div>
      <div className="wrap-load">
        <div className="load-box">
          <InputLoad />
          <div className="standard-load">
            Или загрузить образец
            <ButtonLoad />
          </div>

        </div>
        <ButtonSaveTable />
        <ButtonAddRow />
        <ButtonAddColumn />
      </div>
      <div className="wrap-hidden">
        <ButtonHiddenColumns />
      </div>
      {
        !!dataTitle.length && !!dataTable.length && <Table />
      }
    </div>
  );
};

export default App;
