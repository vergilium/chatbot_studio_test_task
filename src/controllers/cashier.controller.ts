import { Request, Response, NextFunction } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';
import log from '../utils/logger';
import sequelize from "../db/context/context";
import Cashier, { ICashier } from "../db/models/cashier.model";


const getCashier = async (req: Request, res: Response) => {
    try {
        return res.status(200).json(<ICashier[]>(await sequelize.getRepository(Cashier).findAll()));
    } catch (ex) {
        log.error((<Error>ex).message);
        log.debug(ex);
        res.sendStatus(500);
    }
};

const getCashiers = async (req: Request, res: Response) => {
    try {
        let id: number = parseInt(req.params.id, 10);
        return res.status(200).json(<ICashier>(await sequelize.getRepository(Cashier).findByPk(id)));
    } catch (ex) {
        log.error((<Error>ex).message);
        log.debug(ex);
        res.sendStatus(500);
    }
};

const addCashier = async (req: Request, res: Response) => {
    try {
        validationResult(req).throw();
        const newCashier = <ICashier>req.body;
        await sequelize.getRepository(Cashier).create(newCashier);
        res.status(200).json({ success: true });
    } catch (ex) {
        log.error((<Error>ex).message || (<Result<ValidationError>>ex).mapped());
        log.debug(ex);
        res.status(500).json((<Result<ValidationError>>ex).mapped());
    }
}

const updateCashier = async (req: Request, res: Response) => {
    try {
        validationResult(req).throw();
        let id: number = parseInt(req.params.id, 10);
        if (!id) throw new Error('Id is not number or null');
        const cashier = <ICashier>req.body;
        await sequelize.getRepository(Cashier).update(cashier, { where: { id: id } });
        res.status(200).json({ success: true });
    } catch (ex) {
        log.error((<Error>ex).message || (<Result<ValidationError>>ex).mapped());
        log.debug(ex);
        res.status(500).json((<Result<ValidationError>>ex).mapped());
    }
}

export default { getCashier, getCashiers, addCashier, updateCashier };
