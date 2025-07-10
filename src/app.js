
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoptions.router.js';  
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express(); 
const PORT = process.env.PORT || 8080;

const swaggerDocument = YAML.load('src/docs/users.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const MONGO_USER = "amarzetti";
const MONGO_PASS = "oR7qCVDNcvOmQGqe";
const DB_NAME = "adoptme"; 

const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.nl4wabe.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

app.get('/', (req, res) => {
  res.send('API AdoptMe funcionando correctamente');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

export default app;
