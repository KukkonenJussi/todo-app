import todosData from '../mockDb';
import { TodoItem } from '../types';

const todos: TodoItem[] = todosData

const getAllTodos = (): TodoItem[] => {
    return todos;
}

export default { getAllTodos }