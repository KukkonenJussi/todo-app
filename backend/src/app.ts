import express from 'express';
import todoRoute from './routes/todoRoutes'
import cors from 'cors';

const app = express();

app.use(cors())
app.use(express.json());

app.use('/todos', todoRoute)

export default app;