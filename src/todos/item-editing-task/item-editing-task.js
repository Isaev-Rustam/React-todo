import { Component, createRef } from 'react';
import './item-editing-task.css';
import PropTypes from 'prop-types';

class ItemEditingTask extends Component {
  state = { value: '' };

  refInput = createRef();

  componentDidMount() {
    const { label } = this.props;
    this.setState({ value: label });
    this.refInput.current.focus();
  }

  handlerKeyDown = (e) => {
    const { value } = this.state;
    const { onFormatLabel, onEditing } = this.props;
    if (e.key === 'Enter') {
      onFormatLabel(value);
    }
    if (e.key === 'Escape') {
      onEditing();
    }
  };

  handlerChange = (e) => {
    this.setState({ value: e.target.value });
  };

  blur = () => {
    const { onEditing } = this.props;
    onEditing();
  };

  render() {
    const { value } = this.state;
    return (
      <input
        type="text"
        className="edit"
        value={value}
        onKeyDown={this.handlerKeyDown}
        onChange={this.handlerChange}
        onBlur={this.blur}
        ref={this.refInput}
      />
    );
  }
}

ItemEditingTask.defaultProps = {
  label: 'Editing task',
};

ItemEditingTask.propTypes = {
  onFormatLabel: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default ItemEditingTask;
