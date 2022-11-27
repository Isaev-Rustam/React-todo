import './footer.css';
import PropTypes from 'prop-types';

import Filter from '../filter';

function Footer({ onFilterChange, filter, onClearCompletedTasks, isCompletedTasksCounter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{isCompletedTasksCounter}&nbsp;items left</span>
      <Filter onFilterChange={onFilterChange} filter={filter}>
        <Filter.Btn name="all">all</Filter.Btn>
        <Filter.Btn name="active">active</Filter.Btn>
        <Filter.Btn name="completed">completed</Filter.Btn>
      </Filter>
      <button type="button" className="clear-completed" onClick={onClearCompletedTasks}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  isCompletedTasksCounter: '$',
};
Footer.propTypes = {
  isCompletedTasksCounter: PropTypes.string,
};

export default Footer;
