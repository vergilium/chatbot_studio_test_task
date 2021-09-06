/********************************************
 * Exporting db context.
 * @author Maloivan Oleksii
 * @version 1.0.0
 ********************************************/
import { Sequelize } from 'sequelize-typescript';
import config from './config';

const sequelize = new Sequelize(config);

export default sequelize;
