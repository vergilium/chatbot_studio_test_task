import {
  Table, Column, Model, DataType, HasMany, BelongsToMany,
} from 'sequelize-typescript';
import Cashier, { CashierAttributes } from './cashier.model';

export interface ShopAttributes {
  id: number;
  name: string;
  fullname: string;
  city: Cities;
  location: string;
  description?: string;
  workStart?: Date;
  workEnd?: Date;
  IsAlltime?: boolean;
  cashiers?: CashierAttributes[];
}

//Мiста потрiбно робити в iншiй таблицi
//та посилатись по id 
//але для прикладу зробив enum
export enum Cities {
  Lviv = 'Львов',
  Kiev = 'Киев',
  Nikolaev = 'Николаев'
  // and other
}

@Table
export default class Shop extends Model {

  @Column(DataType.STRING(10))
  public name!: string;

  @Column(DataType.STRING(60))
  public fullname!: string;

  @Column(DataType.STRING(60))
  public city!: Cities;

  @Column(DataType.STRING)
  public location!: string;

  @Column(DataType.TEXT)
  public description?: string;

  @Column(DataType.TIME)
  public workStart?: number = 0;

  @Column(DataType.TIME)
  public workEnd?: number = 0;

  @Column({
    type: DataType.VIRTUAL,
    get() {
      if (this.getDataValue('workStart') === 0 && this.getDataValue('workEnd') === 0) {
        return true;
      }
      return false;
    }
  })
  public isAlltime?: boolean;

  @HasMany(() => Cashier)
  public cashiers?: CashierAttributes[];
}