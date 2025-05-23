import { useEffect, useMemo, useState } from "react";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  Container,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";

import { TodoItem } from "./types";
import todoService from "./services/todoService";
import extractAxiosErrorMessage from "./utils/extractAxiosErrorMessage";

import AppHeader from "./components/header/AppHeader";
import TodoList from "./components/todo/TodoList";
import AddTodoForm from "./components/todo/AddTodoForm";
import Notification from "./components/Notification";

import DeleteAllDialog from "./components/dialogs/DeleteAllDialog";
import DeleteDialog from "./components/dialogs/DeleteDialog";
import EditDialog from "./components/dialogs/EditDialog";

const App = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<TodoItem | null>(null);

  const [todoToEdit, setTodoToEdit] = useState<TodoItem | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedTodoName, setEditedTodoName] = useState("");

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await todoService.getAllTodos();
        setTodos(data);
      } catch (error) {
        const message = extractAxiosErrorMessage(error);
        if (message) {
          setMessage(message);
        } else {
          console.log(error);
        }
      }
    };

    void fetchData();
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          background: darkMode
            ? {
                default: blueGrey[900],
                paper: blueGrey[800],
              }
            : {},
          text: {
            primary: darkMode ? "#fff" : "#000",
          },
        },
      }),
    [darkMode]
  );

  const toggleDarkMode = () => {
    if (darkMode === true) {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
  };

  const handleCreateTodo = async (name: string) => {
    try {
      const data = await todoService.createTodo({ name });
      setTodos(todos.concat(data));
      setMessage(`'${name}' added succesfully!`);
    } catch (error) {
      const message = extractAxiosErrorMessage(error);
      if (message) {
        setMessage(message);
      } else {
        console.log(error);
      }
    }
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteAllDialogClose = () => {
    setDeleteAllDialogOpen(false);
  };

  const handleDeleteDialogOpen = (id: string) => {
    const todoToRemove = todos.find((todo) => todo.id === id);

    if (todoToRemove) {
      setTodoToDelete(todoToRemove);
      setDeleteDialogOpen(true);
    }
  };

  const handleConfirmDeleteTodo = async () => {
    if (todoToDelete) {
      try {
        await todoService.deleteTodo(todoToDelete.id);
        setTodos(todos.filter((t) => t.id !== todoToDelete.id));
        setMessage(`'${todoToDelete.name}' deleted succesfully!`);
      } catch (error) {
        const message = extractAxiosErrorMessage(error);
        if (message) {
          setMessage(message);
        } else {
          console.log(error);
        }
      }
    }
    handleDeleteDialogClose();
  };

  const handleDeleteAllTodos = async () => {
    try {
      await todoService.deleteAllTodos();
      setTodos([]);
      setMessage(`Todos deleted succesfully!`);
    } catch (error) {
      const message = extractAxiosErrorMessage(error);
      if (message) {
        setMessage(message);
      } else {
        console.log(error);
      }
    }
    handleDeleteAllDialogClose();
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

  const handleConfirmEditTodo = async () => {
    if (todoToEdit) {
      try {
        await todoService.updateTodo(todoToEdit.id, { name: editedTodoName });

        setTodos(
          todos.map((todo) =>
            todo.id === todoToEdit.id ? { ...todo, name: editedTodoName } : todo
          )
        );

        setMessage(`${editedTodoName} edited succesfully!`);
      } catch (error) {
        const message = extractAxiosErrorMessage(error);
        if (message) {
          setMessage(message);
        } else {
          console.log(error);
        }
      }
    }
    handleEditDialogClose();
  };

  const handleCompletedChange = async (id: string) => {
    try {
      const updatedTodo = await todoService.updateTodoCompleted(id);
      setTodos(
        todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
    } catch (error) {
      const message = extractAxiosErrorMessage(error);
      if (message) {
        setMessage(message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" fixed>
        <AppHeader
          onDelete={() => setDeleteAllDialogOpen(true)}
          toggleDarkMode={toggleDarkMode}
        />
        <Notification message={message} />
        <AddTodoForm
          onSubmit={(name) => {
            void handleCreateTodo(name);
          }}
        />
        <TodoList
          todos={todos}
          onDelete={handleDeleteDialogOpen}
          onUpdate={handleEditDialogOpen}
          onCompletedUpdate={handleCompletedChange}
        />

        <DeleteDialog
          open={deleteDialogOpen}
          todo={todoToDelete}
          onClose={handleDeleteDialogClose}
          onConfirm={handleConfirmDeleteTodo}
        />

        <DeleteAllDialog
          open={deleteAllDialogOpen}
          onClose={handleDeleteAllDialogClose}
          onConfirm={handleDeleteAllTodos}
        />

        <EditDialog
          open={editDialogOpen}
          onClose={handleEditDialogClose}
          onConfirm={handleConfirmEditTodo}
          editedName={editedTodoName}
          onNameChange={setEditedTodoName}
        />
      </Container>
    </ThemeProvider>
  );
};

export default App;
