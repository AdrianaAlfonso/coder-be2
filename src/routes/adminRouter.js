import { Router } from 'express';
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/userController.js';
import passportCall from '../middlewares/passportCall.js';
import authorization from '../middlewares/auth.js';

const adminRouter = Router();

adminRouter.use(passportCall);
adminRouter.use(authorization('admin'));

adminRouter.get('/users', async (req, res) => {
  try {
    const result = await getUsers();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

adminRouter.get('/users/:uid', async (req, res) => {
  try {
    const uid = req.params.uid;
    const result = await getUserById(uid);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

adminRouter.put('/users/:uid', async (req, res) => {
  try {
    const uid = req.params.uid;
    const result = await updateUser(uid, req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

adminRouter.delete('/users/:uid', async (req, res) => {
  try {
    const uid = req.params.uid;
    const result = await deleteUser(uid);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

export default adminRouter;
