import "./styles.css";
import AddTodo from "./AddingTodo";
import TaskList from "./TaskList";
import TaskContext from "./TaskContext";

export default function App() {
  return (
    <div className="App">
      <center>
        <h1>Todo App</h1>
      </center>
      <TaskContext>
        <AddTodo />
        <TaskList />
      </TaskContext>
    </div>
  );
}
