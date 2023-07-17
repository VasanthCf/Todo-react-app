import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import "./completedTask.css";

const CompletedDropdown = ({ todos }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="container-completed">
      <h4 onClick={() => setCollapsed(!collapsed)} className="title-completed">
        {collapsed ? (
          <FaAngleDown className="icons" />
        ) : (
          <FaAngleUp className="icons" />
        )}
        Completed Tasks
      </h4>
      {collapsed && todos.length !== 0 ? (
        <ol>
          {todos.map((item) => (
            <li key={item.id} className="list-item-completed">
              <h3 className="task-title"> {item.title}</h3>
            </li>
          ))}
        </ol>
      ) : (
        collapsed && (
          <div className="empty">
            {" "}
            <p>Empty!</p>
          </div>
        )
      )}
    </div>
  );
};

export default CompletedDropdown;
