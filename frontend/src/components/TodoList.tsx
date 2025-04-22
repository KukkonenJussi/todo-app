import { Table, TableBody } from "@mui/material";
import { TodoItem } from "../types";
import TodoListItem from "./TodoListItem";

interface TodoListProps {
  todos: TodoItem[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, newName: string) => void;
}

const TodoList = ({ todos, onDelete, onUpdate }: TodoListProps) => {
  return (
    <Table>
      <TableBody>
        {todos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todoItem={todo}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default TodoList;
