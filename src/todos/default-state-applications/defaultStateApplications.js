const initialState = {
  todoData: [
    {
      id: '2488544113',
      done: false,
      editing: false,
      label: 'Complete task',
      time: { taskAddTime: 1667303819786, timeToNow: '2 minutes', deadline: 600, isCounting: false },
    },
    {
      id: '6986027266',
      done: false,
      editing: true,
      label: 'Editing task',
      time: { taskAddTime: 1667303819786, timeToNow: '2 minutes', deadline: 330, isCounting: false },
    },
    {
      id: '218227547',
      done: true,
      editing: false,
      label: 'Active task',
      time: { taskAddTime: 1667303819786, timeToNow: '2 minutes', deadline: 90, isCounting: false },
    },
  ],
  filter: 'all',
};

export default initialState;
