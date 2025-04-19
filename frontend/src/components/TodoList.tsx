import { TodoItem } from "../types";

interface TodoListProps {
  todos: TodoItem[];
}

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;