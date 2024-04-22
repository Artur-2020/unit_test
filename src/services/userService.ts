import { IUser } from '../interfaces/user';
import UsersRepository from '../repositories/userRepository';
class UsersService {
  private userRepository: typeof UsersRepository;

  constructor() {
    this.userRepository = UsersRepository;
  }

  /**
   * Retrieves all users from the user repository.
   *
   * @return {Promise<IUser[]>} An array of user objects.
   */
  async getAllUsers(): Promise<IUser[]> {
    return this.userRepository.find({});
  }

  /**
   * Creates a new user in the user repository.
   * @param user
   */
  async createUser(user: IUser): Promise<IUser> {
    return this.userRepository.create(user);
  }
}

export default new UsersService();
