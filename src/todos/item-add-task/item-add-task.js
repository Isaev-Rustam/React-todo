import { useEffect, useRef, useState } from 'react';
import './item-add-task.css';
import PropTypes from 'prop-types';
import className from 'classnames';

function ItemAddTask({ onAddTask }) {
  const textInput = useRef(null);

  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');
  const [dirtyLabel, setDirtyLabel] = useState(true);
  const [dirtyMin, setDirtyMin] = useState(false);
  const [dirtySec, setDirtySec] = useState(false);

  const focusTextInput = () => {
    textInput.current.focus();
  };

  useEffect(() => {
    focusTextInput();
  }, []);

  const handleLabel = ({ target: { value } }) => {
    setLabel(value);
    if (!value.trim()) {
      setDirtyLabel(true);
    } else {
      setDirtyLabel(false);
    }
  };

  const matchTime = (name, value, dirty) => {
    switch (name) {
      case 'min':
        setMin(value);
        setDirtyMin(dirty);
        break;
      case 'sec':
        setSec(value);
        setDirtySec(dirty);
        break;
      default:
        setSec(value);
        setDirtySec(dirty);
        setMin(value);
        setDirtyMin(dirty);
    }
  };

  const handleChangeTime = ({ target: { name, value } }) => {
    if (!Number.isInteger(Number(value)) || Number(value) <= 0) {
      const newValue = value.replace(/\D/g, '');
      matchTime(name, newValue, true);
      return;
    }
    if (value > 60) {
      matchTime(name, 60, false);
    } else {
      matchTime(name, value, false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (dirtyLabel || dirtyMin || dirtySec) return;
    const deadline = Number(min) * 60 + Number(sec);

    onAddTask(label, deadline);
    focusTextInput();
    setLabel('');
    setMin('');
    setSec('');
    setDirtyLabel(true);
    setDirtyMin(false);
    setDirtySec(false);
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={submitHandler}>
        <input
          className="new-todo"
          type="text"
          placeholder="Task"
          name="label"
          value={label}
          ref={textInput}
          onChange={handleLabel}
        />
        <input
          className={className('new-todo-form__timer', { 'new-todo-form__timer--error': dirtyMin })}
          type="text"
          placeholder="Min"
          name="min"
          value={min}
          onChange={handleChangeTime}
        />
        <input
          className={className('new-todo-form__timer', { 'new-todo-form__timer--error': dirtySec })}
          type="text"
          placeholder="Sec"
          name="sec"
          value={sec}
          onChange={handleChangeTime}
        />
        <button type="submit" aria-label="submit" style={{ display: 'none' }} />
      </form>
    </header>
  );
}

ItemAddTask.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default ItemAddTask;
