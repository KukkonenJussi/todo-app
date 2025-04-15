import express from 'express';
import pingRoute from './routes/ping'
import todoRoute from './routes/todoRoutes'

const app = express();
app.use(express.json());

app.use('/ping', pingRoute)
app.use('/todos', todoRoute)

export default app;