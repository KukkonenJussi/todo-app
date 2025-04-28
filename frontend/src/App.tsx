import { useEffect, useState } from "react";
import { TodoItem } from "./types";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import Header from "./components/Header";
import Notification from "./components/Notification";
import todoService from "./services/todoService";
import axios from "axios";
import { Container } from "@mui/material";
import DeleteDialog from "./components/DeleteDialog";
import EditDialog from "./components/EditDialog";

const App = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<TodoItem | null>(null);

  const [todoToEdit, setTodoToEdit] = useState<TodoItem | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedTodoName, setEditedTodoName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await todoService.getAllTodos();
        setTodos(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setMessage(error.response?.data.error);
        } else {
          console.log(error);
        }
      }
    };

    fetchData();
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

  const handleConfirmDeleteTodo = async () => {
    if (todoToDelete) {
      try {
        await todoService.deleteTodo(todoToDelete.id);
        setTodos(todos.filter((t) => t.id !== todoToDelete.id));
        setMessage(`'${todoToDelete.name}' deleted succesfully!`);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setMessage(error.response?.data.error);
        } else {
          console.log(error);
        }
      }
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
        if (axios.isAxiosError(error)) {
          setMessage(error.response?.data.error);
        } else {
          console.log(error);
        }
      }
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

      <DeleteDialog
        open={deleteDialogOpen}
        todo={todoToDelete}
        onClose={handleDeleteDialogClose}
        onConfirm={handleConfirmDeleteTodo}
      />

      <EditDialog
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        onConfirm={handleConfirmEditTodo}
        editedName={editedTodoName}
        onNameChange={setEditedTodoName}
      />
    </Container>
  );
};

export default App;
