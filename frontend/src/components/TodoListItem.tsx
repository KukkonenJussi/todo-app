import { TodoItem } from "../types";

interface TodoListProps {
  todoItem: TodoItem;
}

const TodoListItem = ({ todoItem }: TodoListProps) => {
  return (
    <>
      <li>{todoItem.name}</li>
    </>
  );
};

export default TodoListItem;
