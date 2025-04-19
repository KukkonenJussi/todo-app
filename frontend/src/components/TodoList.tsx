import { TodoItem } from "../types";
import TodoListItem from "./TodoListItem";

interface TodoListProps {
  todos: TodoItem[];
}

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <>
      {todos.map((todo) => (
        <TodoListItem key={todo.name} todoItem={todo} />
      ))}
    </>
  );
};

export default TodoList;
