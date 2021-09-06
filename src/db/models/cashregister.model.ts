/********************************************
 * CashRegister db entity.
 * @author Maloivan Oleksii
 * @version 1.0.0
 * @description description of cash
 * register events table model for db and
 * related interfaces
 ********************************************/
//#region imports
import {
  Table, Column, Model, DataType, ForeignKey, BelongsTo, Sequelize, Default, IsBefore, Is
} from 'sequelize-typescript';
import Cashier, { CashierAttributes } from './cashier.model';
//#endregion

export interface CashRegisterAttributes {
  id: number,
  loginTime: Date,
  logoutTime?: Date | null,
  cashier: CashierAttributes
}

/**
 * @class CashRegister db entity
 */
@Table
export default class CashRegister extends Model {

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column(DataType.DATE)
  public loginTime!: Date;

  @Column(DataType.DATE)
  public logoutTime!: Date;

  @ForeignKey(() => Cashier)
  @Column
  public cashier_id!: number;

  @BelongsTo(() => Cashier)
  public cashier!: CashierAttributes;
}