import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


export const ButtonSaveTable = () => {
  const dataTable = useSelector(state => state.dataTable.data);
  const dataTitle = useSelector(state => state.dataTitle.dataTitle);
  const [isAvailable, setIsAvailable] = useState(!!dataTable.length);

  const handleSaveTable = ({ target }) => {
    const data = [dataTitle, dataTable];
    const file = new File([JSON.stringify(data)], 'file.json');
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
