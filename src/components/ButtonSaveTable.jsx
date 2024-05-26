import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


export const ButtonSaveTable = () => {
  const dataTable = useSelector(state => state.dataTable.data);
  const [isAvailable, setIsAvailable] = useState(!!dataTable.length);

  const handleSaveTable = ({ target }) => {
    const file = new File([JSON.stringify(dataTable)], 'file.json');

    const link = document.createElement('a');
    link.download = file.name;
    link.href = URL.createObjectURL(file);
    link.click();
  };

  useEffect(() => {
    setIsAvailable(!!dataTable.length);
  }, [dataTable]);

  return (
    <div className="wrap-save">
      <button
        disabled={!isAvailable}
        className="button"
        onClick={handleSaveTable}
      >
        Save Table
      </button>
    </div>
  );
};
