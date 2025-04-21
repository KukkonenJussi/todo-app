import { TableCell, TableRow } from "@mui/material";
import { TodoItem } from "../types";

interface TodoListProps {
  todoItem: TodoItem;
}

const TodoListItem = ({ todoItem }: TodoListProps) => {
  return (
    <TableRow>
      <TableCell>{todoItem.name}</TableCell>
    </TableRow>
  );
};

export default TodoListItem;
