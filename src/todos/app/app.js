import { Component } from 'react';
import './app.css';
import { formatDistanceToNow } from 'date-fns';

import TaskList from '../task-list';
import ItemAddForm from '../item-add-form';
import Footer from '../footer';

const optionsFormatDistanceToNow = { includeSeconds: true };
const getId = () => Math.floor(Math.random() * 10 ** 10).toString();

export default class App extends Component {
  static createTodoItem(label) {
    const addingTime = new Date().toString();
    return {
      done: false,
      editing: false,
      id: getId(),
      label,
      addingTime,
      timeToNow: 'less than 2 seconds',
    };
  }

  static filter(items, filter) {
    const match = {
      all() {
        return items;
      },
      active() {
        return items.filter((item) => !item.done);
      },
      completed() {
        return items.filter((item) => item.done);
      },
    };
    return match[filter] ? match[filter]() : items;
  }

  static reformatStateTodoData = (todoData, id, key) =>
    todoData.map((el) => (el.id === id ? { ...el, [key]: !el[key] } : el));

  updateInterval = 4000;

  state = {
    todoData: [],
    filter: 'all',
  };

  componentDidMount() {
    this.setState({
      todoData: [
        App.createTodoItem('Completed task'),
        App.createTodoItem('Editing task'),
        App.createTodoItem('Active task'),
      ],
    });
    const tick = () => {
      this.tickTimer();
      this.timerId = setTimeout(tick, this.updateInterval);
    };
    this.timerId = setTimeout(tick, this.updateInterval);
  }

  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  tickTimer = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((task) => {
        const timeToNow = formatDistanceToNow(new Date(task.addingTime), optionsFormatDistanceToNow);

        return { ...task, timeToNow };
      }),
    }));
  };

  addTask = (label) => {
    const newItem = App.createTodoItem(label);
    this.setState(({ todoData }) => ({ todoData: [newItem, ...todoData] }));
  };

  deleteTask = (id) => {
    this.setState(({ todoData }) => ({ todoData: todoData.filter((item) => item.id !== id) }));
  };

  onEditing = (id) => {
    this.setState(({ todoData }) => ({
      todoData: App.reformatStateTodoData(todoData, id, 'editing'),
    }));
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: App.reformatStateTodoData(todoData, id, 'done'),
    }));
  };

  onFormatLabel = (id, label) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((el) => (el.id === id ? { ...el, label, editing: !el.editing } : el)),
    }));
  };

  onFilterChange = (filter) => {
    this.setState(() => ({ filter }));
  };

  onClearCompletedTasks = () => {
    this.setState(({ todoData }) => ({ todoData: todoData.filter((item) => !item.done) }));
  };

  render() {
    const { todoData, filter } = this.state;
    const isVisibleItems = App.filter(todoData, filter);
    const isCompletedTasksCounter = `${todoData.filter((item) => !item.done).length}`;

    return (
      <section className="todoapp">
        <ItemAddForm onAddTask={this.addTask} />
        <section className="main">
          <TaskList
            todos={isVisibleItems}
            onToggleDone={this.onToggleDone}
            onEditing={this.onEditing}
            onDeleted={this.deleteTask}
            onFormatLabel={this.onFormatLabel}
          />
          <Footer
            onFilterChange={this.onFilterChange}
            filter={filter}
            onClearCompletedTasks={this.onClearCompletedTasks}
            isCompletedTasksCounter={isCompletedTasksCounter}
          />
        </section>
      </section>
    );
  }
}
