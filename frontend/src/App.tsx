import React, { useEffect, useState } from "react";
import todoService from "./services/todoService";
import { TodoItem } from "./types";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    todoService.getAllTodos().then((data) => {
      setTodos(data);
    });
  }, []);

  const todoCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    todoService.createTodo({ name }).then((data) => {
      setTodos(todos.concat(data));
      setName('')
    })
  };

  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={todoCreation}>
        <input value={name} onChange={(event) => setName(event.target.value)} />
        <button type="submit">Add</button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
