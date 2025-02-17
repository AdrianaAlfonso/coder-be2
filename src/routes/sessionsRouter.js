import { Router } from 'express';
import passportCall from '../middlewares/passportCall.js';

const router = Router();

router.get('/current', passportCall, async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

export default router;
