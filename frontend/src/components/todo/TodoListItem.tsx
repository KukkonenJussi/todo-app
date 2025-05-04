import { TableCell, TableRow } from "@mui/material";
import { TodoItem } from "../../types";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

interface TodoListProps {
  todoItem: TodoItem;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
  onCompletedUpdate: (id: string) => void;
}

const TodoListItem = ({
  todoItem,
  onDelete,
  onUpdate,
  onCompletedUpdate,
}: TodoListProps) => {
  return (
    <TableRow>
      <TableCell style={{ textDecoration: todoItem.completed ? "line-through" : "none" }}>{todoItem.name}</TableCell>
      <TableCell align="right">
        <IconButton
          aria-label="Delete Todo"
          onClick={() => onDelete(todoItem.id)}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          aria-label="Edit Todo"
          onClick={() => onUpdate(todoItem.id)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="Change completed status"
          onClick={() => onCompletedUpdate(todoItem.id)}
        >
          <CheckIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default TodoListItem;
