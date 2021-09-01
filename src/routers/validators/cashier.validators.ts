import Enum from '../../utils/enums.util';
import { Gender } from '../../db/models/cashier.model';
import { Schema } from 'express-validator';

const newCashierSchema: Schema = {
    id: {
        isEmpty: true,
        errorMessage: 'Id parameter mast be type of int!'
    },
    firstName: {
        isString: true,
        trim: true,
        notEmpty: true,
        isLength: {
            options: {
                min: 2,
                max: 60
            }
        },
        errorMessage: 'The first name mast be a string with length min: 2 and max: 60 characters!',
    },
    lastName: {
        isString: true,
        notEmpty: true,
        trim: true,
        isLength: {
            options: {
                min: 2,
                max: 60
            }
        },
        errorMessage: 'The last name mast be a string with length min: 2 and max: 60 characters!',
    },
    secondName: {
        isString: true,
        trim: true,
        isLength: {
            options: {
                min: 2,
                max: 60
            }
        },
        errorMessage: 'The second name mast be a string with length min: 2 and max: 60 characters!',
        optional: true,
    },
    birthDate: {
        isDate: true,
        toDate: true,
        errorMessage: 'The birst day date mast be correct date only! Error date validation.',
    },
    gender: {
        isString: true,
        toUpperCase: true,
        isIn: {
            options: Enum.toArray(Gender),
            errorMessage: `The gender mast be in ${Enum.toArray(Gender).join(',')}`,
        },
        notEmpty: true,
    },
    dateOfEmployment: {
        isISO8601: true,
        optional: true,
        errorMessage: 'The day of employment mast be correct datetime! Error date validation.',
    },
    dateOfDissmised: {
        isISO8601: true,
        optional: true,
        errorMessage: 'The day of dismissed mast be correct datetime! Error date validation.',
    },
    worksInShifts: {
        isBoolean: true,
        toBoolean: true,
        optional: true,
        errorMessage: 'The inShift parameter mast be a boolean type!',
    },
    lastExpiriance: {
        isString: true,
        optional: true,
        notEmpty: true,
        errorMessage: 'The last expiriance mast be contain information of last place of work as string type!',
    }
};

export default { newCashierSchema };
