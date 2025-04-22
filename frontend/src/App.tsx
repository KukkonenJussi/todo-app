import { useEffect, useState } from "react";
import todoService from "./services/todoService";
import { TodoItem } from "./types";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import Header from "./components/Header";
import axios from "axios";
import { Container } from "@mui/material";
import Notification from "./components/Notification";

const App = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [message, setMessage] = useState<string | null>(null);

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

  const removeTodo = (id: string) => {
    const todoToRemove = todos.find((todo) => todo.id === id);
    const deleteConfirmation = window.confirm(
      `Delete '${todoToRemove?.name}'?`
    );

    if (deleteConfirmation) {
      todoService.deleteTodo(id).then(() => {
        setTodos(todos.filter((t) => t.id !== id));
      });
    }
  };

  const updateTodoName = async (id: string, newName: string) => {
    try {
      const updatedTodo = await todoService.updateTodo(id, { name: newName });
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
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
    <Container maxWidth="sm" fixed>
      <Header header="Todo App" />
      <Notification message={message} />
      <AddTodoForm onSubmit={todoCreation} />
      <TodoList todos={todos} onDelete={removeTodo} onUpdate={updateTodoName} />
    </Container>
  );
};

export default App;
