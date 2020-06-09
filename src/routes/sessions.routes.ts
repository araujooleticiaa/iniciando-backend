import { Router } from 'express';

import CreateSessionsService from '../service/CreateSessionsService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
 const { email, password } = req.body;

 const createSessionsService = new CreateSessionsService();

 const { user, token } = await createSessionsService.execute({
  email,
  password,
 });

 delete user.password;

 return res.json({ user, token });
});

export default sessionsRouter;
