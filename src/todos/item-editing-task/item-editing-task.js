import { useEffect, useRef, useState } from 'react';
import './item-editing-task.css';
import PropTypes from 'prop-types';

function ItemEditingTask({ label, onFormatLabel, onEditing }) {
  const [value, setValue] = useState('');
  const textInput = useRef(null);

  useEffect(() => {
    setValue(label);
    textInput.current.focus();
  }, [label]);

  const handlerKeyDown = (e) => {
    if (e.key === 'Enter') onFormatLabel(value);
    if (e.key === 'Escape') onEditing();
  };

  const handlerChange = ({ target: { value: v } }) => setValue(v);

  const blur = () => onEditing();

  return (
    <input
      type="text"
      className="edit"
      value={value}
      onKeyDown={handlerKeyDown}
      onChange={handlerChange}
      onBlur={blur}
      ref={textInput}
    />
  );
}

ItemEditingTask.defaultProps = {
  label: 'Editing task',
};

ItemEditingTask.propTypes = {
  onFormatLabel: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default ItemEditingTask;
