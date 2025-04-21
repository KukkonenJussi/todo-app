import { useEffect, useState } from "react";
import todoService from "./services/todoService";
import { TodoItem } from "./types";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import axios from "axios";
import { Container, Typography } from "@mui/material";

const App = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [message, setMessage] = useState(null);

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
    <Container>
      <Typography variant="h4" component={"h1"} gutterBottom>
        Todo App
      </Typography>
      {message}
      <AddTodoForm onSubmit={todoCreation} />
      <TodoList todos={todos} />
    </Container>
  );
};

export default App;
