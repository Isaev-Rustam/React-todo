import './task.css';
import PropTypes from 'prop-types';

import ItemEditingTask from '../item-editing-task';

function Task(props) {
  const { label, onDeleted, onToggleDone, onEditing, timeToNow, editing, onFormatLabel, done } = props;
  const task = (
    <div className="view">
      <input className="toggle" type="checkbox" checked={done} onChange={onToggleDone} />
      <label>
        <span className="description">{label}</span>
        <span className="created">{timeToNow}</span>
      </label>
      <button aria-label="edit" type="button" className="icon icon-edit" onClick={onEditing} />
      <button aria-label="destroy" type="button" className="icon icon-destroy" onClick={onDeleted} />
    </div>
  );

  return editing ? <ItemEditingTask label={label} onFormatLabel={onFormatLabel} /> : task;
}

Task.defaultProps = {
  label: 'Hello',
  timeToNow: 'less than $ seconds',
};
Task.propTypes = {
  label: PropTypes.string,
  timeToNow: PropTypes.string,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEditing: PropTypes.func.isRequired,
};

export default Task;
