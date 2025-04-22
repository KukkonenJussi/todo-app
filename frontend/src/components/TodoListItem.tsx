import { TableCell, TableRow } from "@mui/material";
import { TodoItem } from "../types";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface TodoListProps {
  todoItem: TodoItem;
  onDelete: (id: string) => void;
}

const TodoListItem = ({ todoItem, onDelete }: TodoListProps) => {
  return (
    <TableRow>
      <TableCell>
        {todoItem.name}
      </TableCell>
      <TableCell align="right">
        <IconButton onClick={() => onDelete(todoItem.id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default TodoListItem;
