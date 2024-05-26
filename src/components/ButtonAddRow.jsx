import { useEffect, useState } from 'react';
import { ModalFormRow } from './ModalFormRow';
import { useSelector } from 'react-redux';

export const ButtonAddRow = () => {
  const dataTable = useSelector(state => state.dataTable.data);
  const [isAvailable, setIsAvailable] = useState(!!dataTable.length);

  const [showForm, setShowForm] = useState(false);

  const handleClickCreateNewRow = () => {
    setShowForm(true);
  };

  useEffect(() => {
    setIsAvailable(!!dataTable.length);
  }, [dataTable]);

  return (
    <>
      <button
        disabled={!isAvailable}
        className="button" onClick={handleClickCreateNewRow}
      >Add Row
      </button>
      {showForm &&
        <ModalFormRow showForm={showForm} setShowForm={setShowForm} />
      }
    </>
  );
};

