import { useEffect, useState } from "react";
import todoService from "./services/todoService";
import { TodoItem } from "./types";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [message, setMessage] = useState(null)

  useEffect(() => {
    todoService.getAllTodos().then((data) => {
      setTodos(data);
    });
  }, []);

  const todoCreation = async (name: string) => {
    try {
      await todoService.createTodo({ name }).then((data) => {
        setTodos(todos.concat(data));
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data.error);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      {message}
      <AddTodoForm onSubmit={todoCreation} />
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
