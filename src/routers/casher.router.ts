import { check, checkSchema, param } from 'express-validator';
import express from 'express';
const cashierRouter = express.Router();
import cachierController from '../controllers/cashier.controller';
import cahierSchemas from './validators/cashier.validators';

cashierRouter.get('/gettargetcahier1', cachierController.getTargetCashiers1);
cashierRouter.get('/gettargetcahier2', cachierController.getTargetCashiers2);
cashierRouter.get('/', cachierController.getCashiers);
cashierRouter.get('/:id', param('id').isInt().toInt(), cachierController.getCashier);
cashierRouter.post('/', checkSchema(cahierSchemas.newCashierSchema), cachierController.addCashier);
cashierRouter.put('/:id', checkSchema(cahierSchemas.newCashierSchema), cachierController.updateCashier);
cashierRouter.delete('/:id', cachierController.deleteCashier);

export default cashierRouter;
