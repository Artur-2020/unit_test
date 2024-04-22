import AppRouter from './app';
import UserRouter from './user';
import express from "express";

const router = express.Router();


router.use('/', AppRouter);
router.use('/users', UserRouter);
export default router