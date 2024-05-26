import { useEffect, useState } from 'react';
import { ListHiddenColumns } from '../components/ListHiddenColumns';
import { useSelector } from 'react-redux';

export const ButtonHiddenColumns = () => {
  const hiddenColumns = useSelector(state => state.dataTitle.hiddenList);
  const [isShowBtnHiddenColumns, setIsShowBtnHiddenColumns] = useState(false);
  const [isShowListHiddenColumns, setIsShowListHiddenColumns] = useState(false);

  const handleShowHiddenList = () => {
    setIsShowListHiddenColumns(!isShowListHiddenColumns);
  };

  useEffect(() => {
    setIsShowBtnHiddenColumns(!!hiddenColumns.length);
  }, [hiddenColumns]);

  return (
    <div className="wrap-hidden">
      {
        isShowBtnHiddenColumns ?
        <button className='button button_hiddenColumns'
          onClick={handleShowHiddenList}
        >
          Show Hidden Columns &#9658;
        </button> :
        <button className='button' disabled>Show Hidden Columns</button>
      }
      {
        isShowListHiddenColumns && <ListHiddenColumns />
      }
    </div>);
};
