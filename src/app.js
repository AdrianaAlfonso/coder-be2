import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import initiatePassport from './services/passport.js';
import userRouter from './routes/userRouter.js';
import sessionRouter from './routes/sessionsRouter.js';
import adminRouter from './routes/adminRouter.js';
import UserDAO from './daos/userDAO.js';
import bcrypt from 'bcrypt';

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
app.use('/api/admin', adminRouter);

const createAdminUser = async () => {
  const adminEmail = 'admin@example.com';
  const adminPassword = 'admin123';
  const existingAdmin = await UserDAO.getUserByEmail(adminEmail);

  if (!existingAdmin) {
    const adminUser = {
      first_name: 'Admin',
      last_name: 'User',
      age: 30,
      email: adminEmail,
      password: bcrypt.hashSync(adminPassword, 10),
      role: 'admin',
    };
    await UserDAO.createUser(adminUser);
    console.log('Admin de pruebas:', {
      email: adminEmail,
      password: adminPassword,
    });
  } else {
    console.log('Admin de pruebas:', {
      email: adminEmail,
      password: adminPassword,
    });
  }
};

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`Start Server in Port ${PORT}`);
  await createAdminUser();
});
