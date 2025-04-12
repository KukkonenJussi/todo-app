import express from 'express';
import pingRoute from './routes/ping'

const app = express();
app.use(express.json());

app.use(pingRoute)

export default app;