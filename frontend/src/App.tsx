import { useEffect, useState } from "react";
import todoService from "./services/todoService";
import { TodoItem } from "./types";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import Header from "./components/Header";
import axios from "axios";
import { Container, TextField } from "@mui/material";
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<TodoItem | null>(null);
  const [todoToEdit, setTodoToEdit] = useState<TodoItem | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedName, setEditedName] = useState("");

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

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditDialogRequest = (id: string) => {
    const todoToEdit = todos.find((todo) => todo.id === id);

    if (todoToEdit) {
      setTodoToEdit(todoToEdit);
      setEditedName(todoToEdit.name);
      setEditDialogOpen(true);
    }
  };

  const handleConfirmEdit = () => {
    if (todoToEdit) {
      todoService.updateTodo(todoToEdit.id, { name: editedName }).then(() => {
        setTodos(
          todos.map((todo) =>
            todo.id === todoToEdit.id ? { ...todo, name: editedName } : todo
          )
        );
      });
    }
    handleEditDialogClose();
  };

  return (
    <Container maxWidth="sm" fixed>
      <Header header="Todo App" />
      <Notification message={message} />
      <AddTodoForm onSubmit={todoCreation} />
      <TodoList
        todos={todos}
        onDelete={handleDialogRequest}
        onUpdate={handleEditDialogRequest}
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

      <Dialog
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        aria-labelledby="edit-dialog-title"
        aria-describedby="edit-dialog-description"
        onTransitionExited={() => setTodoToEdit(null)}
      >
        <DialogTitle id="edit-dialog-title">{"Edit Todo name"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            autoFocus
            margin="dense"
            label="Todo name"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleConfirmEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;
