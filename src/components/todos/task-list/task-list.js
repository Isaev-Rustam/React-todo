import './task-list.css';
import PropTypes from 'prop-types';

import Task from '../task';

function TaskList({ todos, onDeleted, onToggleDone, onEditing, onFormatLabel }) {
  const listItems = todos.map(({ id, done, editing, label, timeToNow }) => {
    let className = '';
    if (done) {
      className = 'completed';
    }
    if (editing) {
      className = 'editing';
    }
    return (
      <li key={id} className={className}>
        <Task
          done={done}
          label={label}
          timeToNow={timeToNow}
          editing={editing}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          onEditing={() => onEditing(id)}
          onFormatLabel={(lb) => onFormatLabel(id, lb)}
        />
      </li>
    );
  });

  return <ul className="todo-list">{listItems}</ul>;
}

TaskList.propTypes = {
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEditing: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      done: PropTypes.bool,
      id: PropTypes.string,
      label: PropTypes.string,
      addingTime: PropTypes.string,
      timeToNow: PropTypes.string,
    })
  ).isRequired,
};

export default TaskList;
