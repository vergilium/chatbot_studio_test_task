/********************************************
 * Routs declaration.
 * @author Maloivan Oleksii
 * @version 1.0.0
 * @description contains all knowed routs for
 * cashiers endpoints
 ********************************************/
//#region imports
import { check, checkSchema, param } from 'express-validator';
import express from 'express';
import cachierController from '../controllers/cashier.controller';
import cahierSchemas from './validators/cashier.validators';
//#endregion

const cashierRouter = express.Router();

cashierRouter.get('/', cachierController.getCashiers);
cashierRouter.post('/', checkSchema(cahierSchemas.newCashierSchema), cachierController.addCashier);
cashierRouter.get('/gettargetcashier1', cachierController.getTargetCashiers1);
cashierRouter.get('/gettargetcashier2', cachierController.getTargetCashiers2);
cashierRouter.get('/target/:id', param('id').isInt().toInt(), cachierController.getCashier);
cashierRouter.put('/target/:id', checkSchema(cahierSchemas.newCashierSchema), cachierController.updateCashier);
cashierRouter.delete('/target/:id', cachierController.deleteCashier);

export default cashierRouter;
