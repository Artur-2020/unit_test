import AppRouter from './app';
import express from "express";

const router = express.Router();


router.use('/', AppRouter);
export default router