import PropTypes from 'prop-types';
import { renderUppercaseFirstLetter }
  from '../utils/renderUppercaseFirstLetter';

export const Input = ({ field, type }) => (
  <label className="form__label">{renderUppercaseFirstLetter(field)}
    {
    type === 'string' ?
      <input name={field} type="text" /> :
      type === 'number' ?
      <input name={field} type="number" /> :
      <input name={field} type="checkbox" />
    }
  </label>
);


Input.propTypes = {
  field: PropTypes.string,
  type: PropTypes.string,
};
