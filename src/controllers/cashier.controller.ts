import { Request, Response, NextFunction } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';
import log from '../utils/logger';
import sequelize from "../db/context/context";
import Cashier, { CashierAttributes } from "../db/models/cashier.model";
import cashierRepository from '../db/repositories/cashier.repository';



const getCashiers = async (req: Request, res: Response) => {
    try {
        const result = await <CashierAttributes[]>(await sequelize.getRepository(Cashier).findAll());
        return res.status(200).json(result);
    } catch (ex) {
        log.error((<Error>ex).message);
        log.debug(ex);
        res.sendStatus(500);
    }
};

const getCashier = async (req: Request, res: Response) => {
    try {
        validationResult(req).throw();
        return res.status(200).json(<CashierAttributes>(await sequelize.getRepository(Cashier).findByPk(req.params.id)));
    } catch (ex) {
        log.error((<Error>ex).message || (<Result<ValidationError>>ex).mapped());
        log.debug(ex);
        res.status(500).json((<Result<ValidationError>>ex).mapped());
    }
};

const addCashier = async (req: Request, res: Response) => {
    try {
        validationResult(req).throw();
        const newCashier = <CashierAttributes>req.body;
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
        const cashier = <CashierAttributes>req.body;
        await sequelize.getRepository(Cashier).update(cashier, { where: { id: id } });
        res.status(200).json({ success: true });
    } catch (ex) {
        log.error((<Error>ex).message || (<Result<ValidationError>>ex).mapped());
        log.debug(ex);
        res.status(500).json((<Result<ValidationError>>ex).mapped());
    }
}

const deleteCashier = async (req: Request, res: Response) => {
    try {
        let id: number = parseInt(req.params.id, 10);
        if (!id) throw new Error('Id is not number or null');
        await sequelize.getRepository(Cashier).destroy({ where: { id: id } });
        res.status(200).json({ success: true });
    } catch (ex) {
        log.error((<Error>ex).message || (<Result<ValidationError>>ex).mapped());
        log.debug(ex);
        res.status(500).json((<Result<ValidationError>>ex).mapped());
    }
}

const getTargetCashiers1 = async (req: Request, res: Response) => {
    try {
        const result = await cashierRepository.getTargetCashiers1();
        return res.status(200).json(result || []);
    } catch (ex) {
        log.debug(ex);
    }
}

const getTargetCashiers2 = async (req: Request, res: Response) => {
    try {
        const result = await cashierRepository.getTargetCashiers2();
        return res.status(200).json(result || []);
    } catch (ex) {
        log.debug(ex);
    }
}

export default { getCashier, getCashiers, addCashier, updateCashier, deleteCashier, getTargetCashiers1, getTargetCashiers2 };
