import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
 email: string;
 password: string;
}
interface Response {
 user: User;
 token: string;
}
class CreateSessionsService {
 public async execute({ email, password }: Request): Promise<Response> {
  const userRepositoy = getRepository(User);

  const user = await userRepositoy.findOne({ where: { email } });

  if (!user) {
   throw new AppError('Incorrect email/password combination', 401);
  }

  const passwrodMatch = await compare(password, user.password);

  if (!passwrodMatch) {
   throw new AppError('Incorrect email/password combination', 401);
  }

  const token = sign({}, authConfig.jwt.secret, {
   subject: user.id,
   expiresIn: authConfig.jwt.expiresIn,
  });

  return { user, token };
 }
}

export default CreateSessionsService;
