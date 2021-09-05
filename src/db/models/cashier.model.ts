import {
  Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany
} from 'sequelize-typescript';
import Enum from '../../utils/enums.util';
import Shop from './shop.model';
import CashRegister, { CashRegisterAttributes } from './cashregister.model';

export enum Gender {
  MALE = 1,
  FEMALE = 2
}

export interface CashierAttributes {
  id: number,
  firstName: String,
  lastName?: String | undefined
  seccondName?: String,
  birthDate?: Date,
  gender?: Gender;
  dateOfEmployment: Date,
  dateOfDissmised?: Date,
  worksInShifts?: boolean,
  lastExpiriance?: string,
  age?: number | undefined,
  expiriance?: number,
  shop: Shop
  cashRegisters: CashRegisterAttributes[]
}

@Table
export default class Cashier extends Model {

  @Column(DataType.STRING(60))
  public firstName!: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  public lastName?: string;

  @Column(DataType.STRING(60))
  public seccondName?: string;

  @Column(DataType.DATEONLY)
  public birthDate?: Date;

  @Column(DataType.ENUM({
    values: Enum.toArray(Gender)
  }))
  public gender?: Gender;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  public dateOfEmployment!: Date;

  @Column(DataType.DATE)
  public dateOfDissmised?: Date;

  @Column({
    type: DataType.BOOLEAN,
    get() {
      return Boolean(this.getDataValue('worksInShifts'));
    }
  })
  public worksInShifts?: boolean;

  @Column
  public lastExpiriance?: string;

  @Column({
    type: DataType.VIRTUAL,
    get() {
      let today = new Date();
      let birthDate = new Date(this.getDataValue('birthDate'));
      let age = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
  })
  public age?: number;

  @Column({
    type: DataType.VIRTUAL,
    get() {
      let dateOfDissmised = <Date>this.getDataValue('dateOfDissmised');
      let dateOfEmployment = <Date>this.getDataValue('dateOfEmployment');
      if (!dateOfEmployment) {
        return 0;
      }
      if (!dateOfDissmised)
        dateOfDissmised = new Date();

      let months = (dateOfDissmised.getFullYear() - dateOfEmployment.getFullYear()) * 12;
      months -= dateOfEmployment.getMonth();
      months += dateOfDissmised.getMonth();

      return months <= 0 ? 0 : months;
    },
  })
  public expiriance?: number;

  @ForeignKey(() => Shop)
  @Column
  public shopId?: number

  @BelongsTo(() => Shop)
  public shop?: Shop;

  @HasMany(() => CashRegister)
  public cashRegisters?: CashRegisterAttributes[]
}

