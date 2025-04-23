import { TableCell, TableRow } from "@mui/material";
import { TodoItem } from "../types";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface TodoListProps {
  todoItem: TodoItem;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
}

const TodoListItem = ({ todoItem, onDelete, onUpdate }: TodoListProps) => {
  return (
    <TableRow>
      <TableCell>{todoItem.name}</TableCell>
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
      </TableCell>
    </TableRow>
  );
};

export default TodoListItem;
