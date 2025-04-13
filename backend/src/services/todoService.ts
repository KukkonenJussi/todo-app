import todosData from '../mockDb';
import { TodoItem } from '../types';

const todos = todosData

const getAllTodos = (): TodoItem[] => {
    return todos;
}

export default { getAllTodos }