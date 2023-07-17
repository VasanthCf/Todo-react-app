import React, { useState, useEffect } from "react";
import { useDispatchContext, useDataContext } from "./TaskContext";
import { format } from "date-fns";
import "./addingTodo.css";
import DatePicker from "./DatePicker";
export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const todos = useDataContext();
  // const todosLength=todos.length;
  if (todos.length === 0) {
    nextId = 0;
  }
  const dispatch = useDispatchContext();
  const [isInputActive, setIsInputActive] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  useEffect(() => {
    if (startDate) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [startDate]);

  useEffect(() => {
    // Retrieve the nextId value from Local Storage
    const storedNextId = localStorage.getItem("nextId");
    if (storedNextId) {
      nextId = parseInt(storedNextId);
    }
  }, []);

  const handleInputChange = (e) => {
    setIsInputActive(e.target.value !== "");
  };
  return (
    <div className="add-todo-container">
      <input
        className={isInputActive ? "add-todo-input active" : "add-todo-input"}
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          handleInputChange(e);
        }}
        placeholder="Add your task..."
        onBlur={() => setIsInputActive(false)}
      />

      <DatePicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        calenderColor={isInputActive}
      />

      <button
        className={
          isButtonActive
            ? "add-todo-button button-highlight"
            : "add-todo-button"
        }
        onClick={() => {
          if (title !== "" && startDate !== null) {
            const currentTime = new Date();
            // let hours = currentTime.getHours();
            // const amPM = hours >= 12 ? "pm" : "am";
            // hours = hours % 12 || 12;

            dispatch({
              type: "adding",
              id: nextId++,
              title: title.charAt(0).toUpperCase() + title.slice(1),
              time: currentTime.getTime(),
              date: startDate,
              dateISO: currentTime.toISOString(),
              endDate: endDate ? format(endDate, "eee MMM dd") : null
            });

            localStorage.setItem("nextId", nextId.toString());
          } else {
            alert("make sure title and date are selected");
          }
          setIsInputActive(false);
          setTitle("");
          setStartDate(null);
          setEndDate(null);
        }}
      >
        AddTodo
      </button>
    </div>
  );
}
let nextId = 0;
