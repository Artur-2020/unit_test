import { Model } from 'mongoose';
import { IUser } from '../interfaces/user';
import { BaseRepository } from './baseRepository';
import UserModel from '../models/user';

class UsersRepository extends BaseRepository<IUser> {
  constructor(model: Model<IUser>) {
    super(model);
  }


}

export default new UsersRepository(UserModel);
