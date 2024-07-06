import express from 'express';
import { deleteUser, getAllUser, getAllUserData, updateUser } from '../controllers/userController.js';
import { verifyToken } from '../middleware/user.middleware.js';

const userRouter = express.Router();
userRouter.get('/getUserInfo',[verifyToken],getAllUserData);
userRouter.get('/getUser/:id',[verifyToken],getAllUser);
userRouter.put('/updateUser/:id',[verifyToken],updateUser);
userRouter.delete('/deleteUser/:id',[verifyToken],deleteUser);

export default userRouter;