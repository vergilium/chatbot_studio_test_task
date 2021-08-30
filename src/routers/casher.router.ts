import express from 'express';
const cashierRouter = express.Router();
import cachierController from '../controllers/cashier.controller';

cashierRouter.get('/', cachierController.getCashier);
cashierRouter.get('/:id', cachierController.getCashiers);
// cashierRouter.put('/api/cashier', cachierController.add);

export default cashierRouter;
