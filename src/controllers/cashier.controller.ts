import { Request, Response, NextFunction } from 'express';
import sequelize from "../db/context/context";
import Cashier, { ICashier } from "../db/models/cashier.model";

const getCashier = async (req: Request, res: Response) => {
    return res.status(200).json(<ICashier[]>(await sequelize.getRepository(Cashier).findAll()));
};

const getCashiers = async (req: Request, res: Response) => {
    let id: number = parseInt(req.params.id, 10);
    return res.status(200).json(<ICashier>(await sequelize.getRepository(Cashier).findByPk(id)));
};

const addCashier = async (req: Request, res: Response) => {

}

export default { getCashier, getCashiers };
