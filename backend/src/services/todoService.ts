import todosData from '../mockDb';
import { TodoItem, NewTodoEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const todos: TodoItem[] = todosData

const getAllTodos = (): TodoItem[] => {
    return todos;
}

const addTodo = (todo: NewTodoEntry): TodoItem => {
    const newTodo = {
        id: uuidv4(),
        name: todo.name,
        completed: false
    }

    if (!newTodo.name) {
        throw new Error("Name is required!");
    }

    todos.push(newTodo)
    return newTodo
}

export default { getAllTodos, addTodo }