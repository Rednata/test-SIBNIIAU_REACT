import { useEffect, useState } from 'react';
import { ModalFormColumn } from './ModalFormColumn';
import { useSelector } from 'react-redux';

export const ButtonAddColumn = () => {
  const dataTable = useSelector(state => state.dataTable.data);
  const [isAvailable, setIsAvailable] = useState(!!dataTable.length);

  const [showForm, setShowForm] = useState(false);

  const handleAddColumn = () => {
    setShowForm(true);
  };

  useEffect(() => {
    setIsAvailable(!!dataTable.length);
  }, [dataTable]);

  return (
    <>
      <button
        disabled={!isAvailable}
        className="button"
        onClick={handleAddColumn}
      >
        Add Column
      </button>
      {
        showForm &&
        <ModalFormColumn showForm={showForm} setShowForm={setShowForm} />
      }
    </>

  );
};
