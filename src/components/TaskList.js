import React from "react";

const TaskList = ({ tasks, toggleTask, deleteTask }) => {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          <span
            className={`task-text ${task.completed ? "completed" : ""}`}
            onClick={() => toggleTask(task.id)}
          >
            {task.text}
          </span>
          <div className="task-buttons">
            <button
              className="complete-button"
              onClick={() => toggleTask(task.id)}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button
              className="delete-button"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;