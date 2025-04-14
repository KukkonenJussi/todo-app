import todosData from '../mockDb';
import { TodoItem, NewTodoEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const todos: TodoItem[] = todosData

const getAllTodos = (): TodoItem[] => {
    return todos;
}

const addTodo = (todo: NewTodoEntry): TodoItem => {
    const trimmedName = todo.name.trim()

    if (trimmedName === "") {
        throw new Error("Name is required!");
    }

    const newTodo = {
        id: uuidv4(),
        name: trimmedName,
        completed: false
    }


    todos.push(newTodo)
    return newTodo
}

export default { getAllTodos, addTodo }