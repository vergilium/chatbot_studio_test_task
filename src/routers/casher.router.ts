import { check, checkSchema } from 'express-validator';
import express from 'express';
const cashierRouter = express.Router();
import cachierController from '../controllers/cashier.controller';
import cahierSchemas from './validators/cashier.validators'

cashierRouter.get('/', cachierController.getCashier);
cashierRouter.get('/:id', cachierController.getCashiers);
cashierRouter.post('/', checkSchema(cahierSchemas.newCashierSchema), cachierController.addCashier);
cashierRouter.put('/:id', checkSchema(cahierSchemas.newCashierSchema), cachierController.updateCashier);

export default cashierRouter;
