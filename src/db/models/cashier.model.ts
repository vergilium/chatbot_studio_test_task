import {
  Table, Column, Model, DataType,
} from 'sequelize-typescript';

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
  public dateBorn?: Date;

  @Column(DataType.INTEGER)
  public sex?: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  public dateOfEmployment!: Date;

  @Column(DataType.DATE)
  public dateOfDissmised?: Date;

  @Column(DataType.BOOLEAN)
  public worksInShifts?: boolean;

  @Column({
    type: DataType.VIRTUAL,
    get() {
      return new Date().getFullYear() - new Date(this.getDataValue('dateOfEmployment')).getFullYear();
    },
  })
  public age!: number;

  @Column({
    type: DataType.VIRTUAL,
    get() {
      const now = new Date().getTime();
      const employment = new Date(this.getDataValue('dateBorn')).getTime();
      return new Date(now - employment).getUTCMonth();
    },
  })
  public expiriance?: number;
}
