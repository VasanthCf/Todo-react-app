import React from "react";
import { useState, useCallback } from "react";
import { useDispatchContext } from "./TaskContext";
import { format } from "date-fns";
import GetTimeDifference from "./timeCalculation";
import "./task.css";
import { FaRegCalendarTimes } from "react-icons/fa";
import StartTime from "./StartTime";
export default function Task({ todos }) {
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatchContext();
  let taskContent;

  const calcEndDate = todos.endDate
    ? todos.endDate
    : new Date(todos.date).toDateString() === new Date().toDateString()
    ? "Today"
    : format(new Date(todos.date), "eee  MMM dd ");
  const handleChanging = useCallback(
    (e) => {
      dispatch({
        type: "changed",
        task: { ...todos, done: e.target.checked }
      });
    },
    [dispatch, todos]
  );

  if (editing) {
    taskContent = (
      <>
        <input
          className="edit-input"
          type="text"
          value={todos.title}
          onChange={(e) => {
            const name = e.target.value;

            dispatch({
              type: "changed",
              task: {
                ...todos,
                title: name.charAt(0).toUpperCase() + name.slice(1)
              }
            });
          }}
        />
        <button className="save-button" onClick={() => setEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {todos.done ? (
          <span className="task-title">
            <strike className="strike">{todos.title}</strike>
          </span>
        ) : (
          <span className="task-title">{todos.title}</span>
        )}

        <button className="edit-button" onClick={() => setEditing(true)}>
          Edit
        </button>
      </>
    );
  }

  return (
    <label className="task-label">
      <input
        className="checkbox-input"
        type="checkbox"
        checked={todos.done}
        onChange={(e) => handleChanging(e)}
      />

      {taskContent}

      <button
        className="delete-button"
        onClick={() => {
          dispatch({
            type: "deleted",
            id: todos.id
          });
        }}
      >
        Delete
      </button>

      {todos.done ? (
        <GetTimeDifference todos={todos} />
      ) : (
        <p className="time" onClick={(e) => e.preventDefault()}>
          <span className="day">
            <StartTime date={todos.date} />
            <FaRegCalendarTimes className="due-icon" />
            (due) {calcEndDate}
          </span>
        </p>
      )}
    </label>
  );
}
