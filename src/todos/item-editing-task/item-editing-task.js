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

  handleSubmit = (e) => {
    e.preventDefault();
    const { value } = this.state;
    const { onFormatLabel } = this.props;
    onFormatLabel(value);
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  blur = () => {
    const { value } = this.state;
    const { onFormatLabel } = this.props;
    onFormatLabel(value);
  };

  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="edit"
          value={value}
          onChange={this.handleChange}
          onBlur={this.blur}
          ref={this.refInput}
        />
      </form>
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
