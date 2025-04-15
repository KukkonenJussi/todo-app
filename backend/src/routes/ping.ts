import express from 'express';

const router = express.Router();

router.get('/', (_request, response) => {
    response.status(200).send('pong')
})

export default router