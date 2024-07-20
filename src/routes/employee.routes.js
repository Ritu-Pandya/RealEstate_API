import express from 'express'
import { createEmp, getAllEmpData } from '../controllers/empController.js';

const employeeRouter = express.Router();

employeeRouter.post("/createEmp",createEmp );
employeeRouter.get("/getEmp",getAllEmpData );


export default employeeRouter;