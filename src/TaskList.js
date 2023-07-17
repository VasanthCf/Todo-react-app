import React, { useState } from "react";
import Task from "./Task";
import { useDataContext } from "./TaskContext";
import CompletedDropdown from "./CompletedTask";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import "./taskList.css";

export default function TaskList() {
  const todos = useDataContext();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const todoLength = todos.length;
  const completedTodos = todos.filter((t) => t.done === true);
  const todayTask = todos.filter((t) => t.date === new Date().toDateString());

  if (todos.length === 0) {
    return (
      <div className="task-list-container-no-task">
        <h4 className="noTask">No tasks, right now! </h4>
      </div>
    );
  }
  return (
    <div className="task-list-container">
      <h4
        className="title-current"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <FaAngleDown className="icons" />
        ) : (
          <FaAngleUp className="icons" />
        )}
        Current Task {!isCollapsed && <span>({todoLength})</span>}
      </h4>
      {isCollapsed && (
        <ol className="task-list">
          {todos.map((t) => {
            return (
              <li
                key={t.id}
                className={`task-list-item ${
                  t.done ? "faded" : "task-list-item-effect"
                }`}
              >
                <Task todos={t} />
              </li>
            );
          })}
        </ol>
      )}

      <CompletedDropdown todos={completedTodos} />
    </div>
  );
}
