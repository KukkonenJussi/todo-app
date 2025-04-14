import express from 'express';
import todoService from '../services/todoService'; 

const router = express.Router();

router.get('/todos', (_request, response) => {
    response.send(todoService.getAllTodos())
})

router.post('/todos', (request, response) => {
    const { name } = request.body

    const newTodo = todoService.addTodo({ name })

    response.status(201).json(newTodo)
})

export default router