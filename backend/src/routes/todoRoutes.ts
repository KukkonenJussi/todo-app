import express from 'express';
import todos from '../mockDb';

const router = express.Router();

router.get('/todos', (_request, response) => {
    response.status(200).json(todos)
})

export default router