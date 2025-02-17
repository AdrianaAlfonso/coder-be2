import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import initiatePassport from './services/passport.js';
import userRouter from './routes/userRouter.js';
import sessionRouter from './routes/sessionsRouter.js';

const app = express();

const uri = 'mongodb://127.0.0.1:27017/coder-back2';
mongoose.connect(uri);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

initiatePassport(); // iniciamos la configuracion de passport
app.use(passport.initialize()); // inicializamos passport

app.use('/api/users', userRouter);
app.use('/api/sessions', sessionRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`Start Server in Port ${PORT}`);
});
