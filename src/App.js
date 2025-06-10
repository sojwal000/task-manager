import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';

import TaskInput from './components/TaskInput';
import FilterButtons from './components/FilterButtons';
import TaskList from './components/TaskList';
import LoginPage from './components/LoginPage.js';

import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // Load tasks when username changes (user logs in)
  useEffect(() => {
    if (username) {
      const savedTasks = JSON.parse(localStorage.getItem(`${username}_tasks`));
      if (savedTasks) setTasks(savedTasks);
    }
  }, [username]);

  // Save tasks to localStorage when tasks or username change
  useEffect(() => {
    if (username && tasks.length) {
      localStorage.setItem(`${username}_tasks`, JSON.stringify(tasks));
    }
  }, [tasks, username]);

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Incomplete") return !task.completed;
    return true;
  });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/task-manager" />
            ) : (
              <LoginPage
                setIsLoggedIn={setIsLoggedIn}
                setUsername={setUsername}
              />
            )
          }
        />
        <Route
          path="/task-manager"
          element={
            isLoggedIn ? (
              <div className="container">
                <h1>Task Manager</h1>
                <TaskInput addTask={addTask} />
                <FilterButtons setFilter={setFilter} />
                <TaskList
                  tasks={filteredTasks}
                  toggleTask={toggleTask}
                  deleteTask={deleteTask}
                />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
