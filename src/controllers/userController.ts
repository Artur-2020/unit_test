// controllers/UserController.ts
import { Request, Response } from 'express';
import UserService from '../services/userService';

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserById(req: Request, res: Response) {
    const userId = req.params.id;
    try {
      // const user = await UserService.getUserById(userId);
      // if (!user) {
      //   res.status(404).json({ message: 'User not found' });
      // } else {
        res.status(200).json({id: userId});
      // }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    const userId = req.params.id;
    const { name, email } = req.body;
    try {
      // const user = await UserService.updateUser(userId, name, email);
      // if (!user) {
      //   res.status(404).json({ message: 'User not found' });
      // } else {
        res.status(200).json({id: userId});
      // }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const userId = req.params.id;
    try {
      // await UserService.deleteUser(userId);
      res.status(204).end();
    } catch (error : any ) {
      res.status(500).json({ error: error.message || 'Internal server error' });
    }
  }
}

export default new UserController();

