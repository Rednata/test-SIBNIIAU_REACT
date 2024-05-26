import { generateRandomKey } from '../utils/generateRandomKey';
import { useSelector } from 'react-redux';
import { TitleItem } from './TitleItem';
import { RowTableBody } from './RowTableBody';

export const Table = () => {
  const dataTable = useSelector(state => state.dataTable.data);
  const hiddenFields = useSelector(state => state.dataTitle.hiddenList);
  const dataTitle = useSelector(state => state.dataTitle.dataTitle);
  const currentTitle = dataTitle
    .filter(elem => !(hiddenFields.some(elem1 => elem.field === elem1)));

  return (
    <div className="wrap">
      <table className="table">
        <caption className="table__caption">Таблица данных</caption>
        <thead className="table__thead">
          <tr className="tr">
            {
              currentTitle.map(({ field, type }) => (
                <TitleItem
                  key={generateRandomKey()} field={field} type={type}
                />
              )
              )
            }
          </tr>
        </thead>
        <tbody className='table__tbody'>
          {
            dataTable.map((elem, i) => (
              <RowTableBody elem={elem} i={i} key={generateRandomKey()}/>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

