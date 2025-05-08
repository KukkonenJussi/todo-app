import { Table, TableBody } from "@mui/material";
import { TodoItem } from "../../types";
import TodoListItem from "./TodoListItem";

interface TodoListProps {
  todos: TodoItem[];
  onDelete: (id: string) => void | Promise<void>;
  onUpdate: (id: string) => void | Promise<void>;
  onCompletedUpdate: (id: string) => void | Promise<void>;
}

const TodoList = ({
  todos,
  onDelete,
  onUpdate,
  onCompletedUpdate,
}: TodoListProps) => {
  return (
    <Table>
      <TableBody>
        {todos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todoItem={todo}
            onDelete={(id) => {
              void onDelete(id);
            }}
            onUpdate={(id) => {
              void onUpdate(id);
            }}
            onCompletedUpdate={(id) => {
              void onCompletedUpdate(id);
            }}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default TodoList;
