import { useEffect, useState } from "react";
import todoService from "./services/todoService";
import { TodoItem } from "./types";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";

const App = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    todoService.getAllTodos().then((data) => {
      setTodos(data);
    });
  }, []);

  const todoCreation = (name: string) => {
    todoService.createTodo({ name }).then((data) => {
      setTodos(todos.concat(data));
    });
  };

  return (
    <div>
      <h1>Todo App</h1>
      <AddTodoForm onSubmit={todoCreation}/>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
