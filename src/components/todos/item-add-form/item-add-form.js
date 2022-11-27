import { Component } from 'react';
import './item-add-form.css';
import PropTypes from 'prop-types';

class ItemAddForm extends Component {
  state = { value: '' };

  handleSubmit = (e) => {
    e.preventDefault();
    const { value } = this.state;
    const { onAddTask } = this.props;
    if (!value.trim()) {
      return;
    }
    onAddTask(value);
    this.setState({ value: '' });
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { value } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            className="new-todo"
            type="text"
            placeholder="What needs to be done?"
            onChange={this.handleChange}
            value={value}
          />
        </form>
      </header>
    );
  }
}

ItemAddForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default ItemAddForm;
