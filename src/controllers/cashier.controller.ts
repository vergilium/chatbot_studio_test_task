import { Request, Response, NextFunction } from 'express';
import sequelize from "../db/context/context";
import Cashier from "../db/models/cashier.model";

const getCashier = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(await sequelize.getRepository(Cashier).findAll());
};

const getCashiers = async (req: Request, res: Response, next: NextFunction) => {
    let id: number = parseInt(req.params.id, 10);
    return res.status(200).json(await sequelize.getRepository(Cashier).findByPk(id));
};

export default { getCashier, getCashiers };
