import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Task from "./Task";

const SortedTask = ({ todos, title }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const todoLength = todos.length;

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
        {title} {!isCollapsed && <span>({todoLength})</span>}
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
    </div>
  );
};

export default SortedTask;
