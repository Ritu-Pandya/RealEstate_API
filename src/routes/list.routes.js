import express from 'express'
import { createList } from '../controllers/listController.js';

const listingRouter = express.Router();
listingRouter.post("/createlist",createList);

export default listingRouter;