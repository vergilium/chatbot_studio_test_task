import {
  Table, Column, Model, DataType,
} from 'sequelize-typescript';
import Enum from '../../utils/enums.util';

export enum Sex {
  MALE = 1,
  FEMALE = 2
}

export interface ICashier {
  id: number,
  firstName: String,
  lastName: String,
  seccondName?: String,
  dateBorn?: Date,
  sex?: Sex;
  dateOfEmployment: Date,
  dateOfDissmised?: Date,
  worksInShifts?: boolean,
  lastExpiriance?: string,
  age?: number | undefined,
  expiriance: number
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
    values: Enum.toArray(Sex)
  }))
  public sex?: Sex;

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
      const now = new Date().getTime();
      const employment = new Date(this.getDataValue('dateOfEmployment')).getTime();
      return new Date(now - employment).getUTCMonth();
    },
  })
  public expiriance?: number;
}

