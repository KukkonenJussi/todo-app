import express from 'express';
import pingRoute from './routes/ping'
import todoRoute from './routes/todoRoutes'

const app = express();
app.use(express.json());

app.use(pingRoute)
app.use(todoRoute)

export default app;