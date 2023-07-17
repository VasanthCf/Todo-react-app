import React, { createContext, useReducer, useContext, useEffect } from "react";
import taskReducer from "./TaskReducer";

const DataContext = createContext();
const DispatchContext = createContext();

export default function TaskContext({ children }) {
  const [todos, dispatch] = useReducer(taskReducer, initialTodos);
  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(todos));
  }, [todos]);

  return (
    <DataContext.Provider value={todos}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </DataContext.Provider>
  );
}
export function useDataContext() {
  return useContext(DataContext);
}
export function useDispatchContext() {
  return useContext(DispatchContext);
}

let initialTodos = JSON.parse(localStorage.getItem("tasks")) || [];
