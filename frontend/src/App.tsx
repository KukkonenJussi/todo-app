import { useEffect, useState } from "react";
import { TodoItem } from "./types";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import Header from "./components/Header";
import Notification from "./components/Notification";
import todoService from "./services/todoService";
import axios from "axios";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

const App = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<TodoItem | null>(null);

  const [todoToEdit, setTodoToEdit] = useState<TodoItem | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedTodoName, setEditedTodoName] = useState("");

  useEffect(() => {
    todoService.getAllTodos().then((data) => {
      setTodos(data);
    });
  }, []);

  const handleCreateTodo = async (name: string) => {
    try {
      const data = await todoService.createTodo({ name });
      setTodos(todos.concat(data));
      setMessage(`'${name}' added succesfully!`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data.error);
      } else {
        console.log(error);
      }
    }
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteDialogOpen = (id: string) => {
    const todoToRemove = todos.find((todo) => todo.id === id);

    if (todoToRemove) {
      setTodoToDelete(todoToRemove);
      setDeleteDialogOpen(true);
    }
  };

  const handleConfirmDeleteTodo = () => {
    if (todoToDelete) {
      todoService.deleteTodo(todoToDelete.id).then(() => {
        setTodos(todos.filter((t) => t.id !== todoToDelete.id));
      });
    }
    handleDeleteDialogClose();
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditDialogOpen = (id: string) => {
    const todoToEdit = todos.find((todo) => todo.id === id);

    if (todoToEdit) {
      setTodoToEdit(todoToEdit);
      setEditedTodoName(todoToEdit.name);
      setEditDialogOpen(true);
    }
  };

  const handleConfirmEditTodo = () => {
    if (todoToEdit) {
      todoService
        .updateTodo(todoToEdit.id, { name: editedTodoName })
        .then(() => {
          setTodos(
            todos.map((todo) =>
              todo.id === todoToEdit.id
                ? { ...todo, name: editedTodoName }
                : todo
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
      <AddTodoForm onSubmit={handleCreateTodo} />
      <TodoList
        todos={todos}
        onDelete={handleDeleteDialogOpen}
        onUpdate={handleEditDialogOpen}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
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
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleConfirmDeleteTodo} autoFocus>
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
            value={editedTodoName}
            onChange={(e) => setEditedTodoName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleConfirmEditTodo}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;
