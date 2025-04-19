import { useEffect, useState } from "react";
import todoService from "./services/todoService";
import { TodoItem } from "./types";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    todoService.getAllTodos().then((data) => {
      setTodos(data);
    });
  }, []);

  return (
    <div>
      <h1>Todo App</h1>
      <TodoList todos={todos}/>
    </div>
  );
};

export default App;