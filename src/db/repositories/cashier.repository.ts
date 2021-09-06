/********************************************
 * Repository of cashiers.
 * @author Maloivan Oleksii
 * @version 1.0.0
 * @description contains not standart queries
 * to db for cashiers entity.
 ********************************************/
//#region imports
import log from "../../utils/logger";
import { Op } from "sequelize";
import sequelize from "../context/context";
import Cashier, { CashierAttributes } from "../models/cashier.model";
import { Sequelize } from "sequelize-typescript";
import { Cities } from "../models/shop.model";
//#endregion

/**
 * Query for task one "getTargetCashiers1"
 * @returns {Promise<CashierAttributes[] | null>} result of query
 */
const getTargetCashiers1 = async () => {

    const query = await sequelize.getRepository(Cashier).findAll({
        include: [{
            model: sequelize.models.Shop,
            required: true,
            where: {
                city: Cities.Lviv
            }
        }],
        where: {
            [Op.and]: [
                Sequelize.where(Sequelize.literal(`(DATE_PART('year', COALESCE("Cashier"."dateOfDissmised", now())) - DATE_PART('year', COALESCE("Cashier"."dateOfEmployment", now()))) * 12
+ ((DATE_PART('month', COALESCE("Cashier"."dateOfDissmised", now()))) - DATE_PART('month', COALESCE("Cashier"."dateOfEmployment", now())))
                    `), {
                    [Op.gt]: 5 * 12
                }),
                { lastExpiriance: { [Op.in]: ['Silpo', 'Arsen'] } }
            ]
        }

    }).catch(err => {
        log.error((<Error>err).message);
        log.debug((<Error>err).message);
        return -1;
    });

    if (Array.isArray(query) && query.length > 0) {
        return <CashierAttributes[]>query;
    }

    return null;
}

/**
 * Query for task two getTargetCashiers2
 * @returns {Promise<CashierAttributes[] | null>} query result
 */
const getTargetCashiers2 = async () => {
    const query = await sequelize.getRepository(Cashier).findAll({
        include: [{
            model: sequelize.models.Shop,
            required: true,
            where: {
                city: Cities.Lviv,
                location: "Шевченка, 100"
            }
        }, {
            model: sequelize.models.CashRegister,
            required: true,
            where: {
                [Op.and]: [
                    Sequelize.literal(/*sql*/`"loginTime"::time between '22:50'::time and '23:59'::time`),
                    Sequelize.literal(/*sql*/`extract(dow from "loginTime") = 1`),
                    Sequelize.literal(/*sql*/`mod(date_part('day', "loginTime")::numeric, 2) != 0`)
                ]
            }
        }],
    }).catch(err => {
        log.error((<Error>err).message);
        log.debug((<Error>err).message);
        return -1;
    });

    if (Array.isArray(query) && query.length > 0) {
        return <CashierAttributes[]>query;
    }

    return null;
}

export default { getTargetCashiers1, getTargetCashiers2 };

