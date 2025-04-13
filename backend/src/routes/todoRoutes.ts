import express from 'express';
import todos from '../mockDb';
import { v4 as uuidv4 } from 'uuid'

const router = express.Router();

router.get('/todos', (_request, response) => {
    response.status(200).json(todos)
})

router.post('/todos', (request, response) => {
    const { name, completed } = request.body

    const newTodo = {
        id: uuidv4(),
        name,
        completed
    }

    todos.push(newTodo)

    response.status(201).json(newTodo)
})

export default router