import express, {Request, Response} from 'express';
import UserController from "../controllers/userController";
const router = express.Router();

router.get('/', UserController.getAllUsers);
router.post('/', UserController.createUser);


export default router;
