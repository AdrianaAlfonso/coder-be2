import { Router } from 'express';
import {
  createUser,
  getUserById,
  getUsers,
  login,
  updateUser,
} from '../controllers/userController.js';
import passportCall from '../middlewares/passportCall.js';

const userRouter = Router();

userRouter.get('/', passportCall, async (req, res) => {
  try {
    const result = await getUsers({ role: 'user' });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Actualizar un usuario
userRouter.put('/:uid', passportCall, async (req, res) => {
  try {
    if (req.body.role) {
      return res.status(400).send({
        message: 'No tienes permisos para cambiar el ROL de un usuario',
      });
    }
    const uid = req.params.uid;
    const result = await updateUser(uid, req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

userRouter.get('/profile', passportCall, async (req, res) => {
  try {
    const result = await getUserById(req.user.id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Registra un usuario
userRouter.post('/register', async (req, res) => {
  try {
    const result = await createUser(req.body);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Login de usuario
userRouter.post('/login', async (req, res) => {
  try {
    const result = await login(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

export default userRouter;
