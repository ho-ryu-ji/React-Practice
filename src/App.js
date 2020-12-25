import React, { useState } from "react";
import { nanoid } from "nanoid";
import './App.css';
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

export default function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');
  const FILTER_NAMES = Object.keys(FILTER_MAP);

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
        if (id === task.id) {
          return {...task, name: newName}
        }
        return task;
      });
      setTasks(editedTaskList);
  }

  function toggleTaskCompleted(id) {
    console.log(tasks[0])
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return { ...task, completed: !task.completed }
      }
      return task;
    });
    setTasks(updatedTasks);
  }

const taskList = tasks
.filter(FILTER_MAP[filter])
.map(task => (
  <Todo
    id={task.id}
    name={task.name}
    completed={task.completed}
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    editTask={editTask}
  />
)
);

const filterList = FILTER_NAMES.map(name => (
  <FilterButton
    key={name}
    name={name}
    isPassed={name === filter}
    setFilter={setFilter}
  />
));

const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
const headingText = `${taskList.length} ${tasksNoun} remaining`;

return (
  <div className="todoapp stack-large">
    <h1>TodoMatic</h1>
    <Form addTask={addTask} />
    <div className="filters btn-group stack-exception">
      {FilterButton}
    </div>
    <h2 id="list-heading">{headingText}</h2>
    <ul
      role="list"
      className="todo-list stack-large stack-exception"
      aria-labelledby="list-heading"
    >
      {taskList}
    </ul>
  </div>
);
}