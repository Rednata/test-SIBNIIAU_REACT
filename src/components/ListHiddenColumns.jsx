import { useDispatch, useSelector } from 'react-redux';
import { generateRandomKey } from '../utils/generateRandomKey';
import { dataTitleSlice } from '../store/DataTitle/dataTitleSlice';
import { renderUppercaseFirstLetter }
  from '../utils/renderUppercaseFirstLetter';

export const ListHiddenColumns = () => {
  const hiddenColumns = useSelector(state => state.dataTitle.hiddenList);
  const dispatch = useDispatch();

  const handleShowChoiseColumn = ({ target }) => {
    const newHiddenColumns = hiddenColumns
      .filter(elem =>
        (elem.toLowerCase() !== (target.textContent).toLowerCase()));
    dispatch(dataTitleSlice.actions.hiddenTitleColumns(newHiddenColumns));
  };

  return (
    <div className="hidden">
      <ul className="hidden__list">
        {
          hiddenColumns.map(elem => (
            <li className="hidden__item" key={generateRandomKey()}>
              <button className="hidden__btn" onClick={handleShowChoiseColumn}>{
                renderUppercaseFirstLetter(elem)
              }
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};
