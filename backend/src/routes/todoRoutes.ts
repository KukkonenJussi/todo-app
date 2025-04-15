import express from 'express';
import todoService from '../services/todoService'; 

const router = express.Router();

router.get('/todos', (_request, response) => {
    response.send(todoService.getAllTodos())
})

router.post('/todos', (request, response) => {
    const { name } = request.body

    if (!name) {
        response.status(400).json({ error: "Name is required!" })
    }

    const newTodo = todoService.addTodo({ name })

    response.status(201).json(newTodo)
})

export default router