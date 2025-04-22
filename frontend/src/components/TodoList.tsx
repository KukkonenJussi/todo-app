import { Table, TableBody } from "@mui/material";
import { TodoItem } from "../types";
import TodoListItem from "./TodoListItem";

interface TodoListProps {
  todos: TodoItem[];
  onDelete: (id: string) => void;
}

const TodoList = ({ todos, onDelete }: TodoListProps) => {
  return (
    <Table>
      <TableBody>
        {todos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todoItem={todo}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default TodoList;
