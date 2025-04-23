import { useEffect, useState } from "react";
import todoService from "./services/todoService";
import { TodoItem } from "./types";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import Header from "./components/Header";
import axios from "axios";
import { Container } from "@mui/material";
import Notification from "./components/Notification";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const App = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [todoToDelete, setTodoToDelete] = useState<TodoItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogRequest = (id: string) => {
    const todoToRemove = todos.find((todo) => todo.id === id);

    if (todoToRemove) {
      setTodoToDelete(todoToRemove);
      setDialogOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (todoToDelete) {
      todoService.deleteTodo(todoToDelete.id).then(() => {
        setTodos(todos.filter((t) => t.id !== todoToDelete.id));
      });
    }
    handleDialogClose();
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
      <TodoList
        todos={todos}
        onDelete={handleDialogRequest}
        onUpdate={updateTodoName}
      />

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onTransitionExited={() => setTodoToDelete(null)}
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Delete Todo '${todoToDelete?.name}'?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;
