import express from 'express'
import { createList, deleteList, getAllListings, getListById, updateList } from '../controllers/listController.js';

const listingRouter = express.Router();
listingRouter.post("/createlist",createList);
listingRouter.get("/getallList",getAllListings);
listingRouter.get("/getListById/:id",getListById);
listingRouter.patch("/updateById/:id",updateList);
listingRouter.delete("/deleteList/:id",deleteList);

export default listingRouter;