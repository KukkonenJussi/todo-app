import { Table, TableBody } from "@mui/material";
import { TodoItem } from "../types";
import TodoListItem from "./TodoListItem";

interface TodoListProps {
  todos: TodoItem[];
}

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <Table>
      <TableBody>
        {todos.map((todo) => (
          <TodoListItem key={todo.id} todoItem={todo} />
        ))}
      </TableBody>
    </Table>
  );
};

export default TodoList;
