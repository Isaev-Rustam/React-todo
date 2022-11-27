import './filter.css';
import PropTypes from 'prop-types';
import className from 'classnames';
import { Children, cloneElement } from 'react';

function Filter({ children, filter, onFilterChange }) {
  const renderChildren = () =>
    Children.map(children, (child) =>
      cloneElement(child, {
        clName: className({ selected: filter === child.props.name }),
        onFilterChange: () => onFilterChange(child.props.name),
      })
    );
  return <ul className="filters">{renderChildren()}</ul>;
}
Filter.Btn = function Btn({ children, clName, onFilterChange }) {
  return (
    <li>
      <button type="button" className={clName} onClick={onFilterChange}>
        {children}
      </button>
    </li>
  );
};

Filter.defaultProps = {
  filter: 'all',
};
Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.string,
};

export default Filter;
