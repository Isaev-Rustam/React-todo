import { useEffect, useState } from 'react';
import './app.css';
import { formatDistanceToNow } from 'date-fns';

import TaskList from 'todos/task-list';

import ItemAddTask from '../item-add-task';
import Footer from '../footer';
import initialState from '../default-state-applications';

const optionsFormatDistanceToNow = { includeSeconds: true };
const getId = () => Math.floor(Math.random() * 10 ** 10).toString();

export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [filter, setFilter] = useState('all');

  const UPDATE_INTERVAL = 4000;

  useEffect(() => {
    const todos = App.getDataLocalStorage('todo');
    if (todos) {
      setTodoData(todos.todoData);
      setFilter(todos.filter);
    } else {
      setTodoData(initialState.todoData);
      setFilter(initialState.filter);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify({ todoData, filter }));
  }, [todoData, filter]);

  useEffect(() => {
    const id = setInterval(() => {
      setTodoData((data) =>
        data.map((task) => {
          const timeToNow = formatDistanceToNow(task.time.taskAddTime, optionsFormatDistanceToNow);
          return { ...task, time: { ...task.time, timeToNow } };
        })
      );
    }, UPDATE_INTERVAL);

    return () => clearInterval(id);
  }, []);

  const addTask = (label, deadline) => {
    const newItem = App.createTodoItem(label, deadline);
    setTodoData((b) => [newItem, ...b]);
  };

  const deleteTask = (id) => {
    setTodoData((data) => data.filter((item) => item.id !== id));
  };

  const onEditing = (id) => {
    setTodoData((data) => App.toggleStateTodoData(data, id, 'editing'));
  };

  const onToggleDone = (id) => {
    setTodoData((data) => App.toggleStateTodoData(data, id, 'done'));
  };

  const onFormatLabel = (id, label) => {
    setTodoData((data) => data.map((el) => (el.id === id ? { ...el, label, editing: !el.editing } : el)));
  };

  const onFilterChange = (a) => {
    setFilter(() => a);
  };

  const onClearCompletedTasks = () => {
    setTodoData((data) => data.filter((item) => !item.done));
  };

  const onUpdateTime = (id, deadline, isCounting) => {
    setTodoData((data) =>
      data.map((el) => (el.id === id ? { ...el, time: { ...el.time, deadline, isCounting } } : el))
    );
  };

  const isVisibleItems = App.filter(todoData, filter);
  const completedTasksCount = App.completedTasksCount(todoData);

  return (
    <section className="todoapp">
      <ItemAddTask onAddTask={addTask} />
      <section className="main">
        <TaskList
          todos={isVisibleItems}
          onToggleDone={onToggleDone}
          onEditing={onEditing}
          onDeleted={deleteTask}
          onFormatLabel={onFormatLabel}
          onUpdateTime={onUpdateTime}
        />
        <Footer
          onFilterChange={onFilterChange}
          filter={filter}
          onClearCompletedTasks={onClearCompletedTasks}
          isCompletedTasksCounter={completedTasksCount}
        />
      </section>
    </section>
  );
}

App.createTodoItem = (label, deadline) => ({
  id: getId(),
  done: false,
  editing: false,
  label,
  time: {
    taskAddTime: Date.now(),
    timeToNow: 'less than 2 seconds',
    deadline,
  },
});
App.completedTasksCount = (ar) => `${ar.filter((item) => !item.done).length}`;
App.filter = (items, filter) => {
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
};
App.toggleStateTodoData = (data, id, key) => data.map((el) => (el.id === id ? { ...el, [key]: !el[key] } : el));
App.getDataLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
