import { SequelizeOptions } from 'sequelize-typescript';
import path from 'path';
import log from '../../utils/logger';

const config: SequelizeOptions = {};
config.username = process.env.DB_USER;
config.password = process.env.DB_PASWORD;
config.database = process.env.DB_NAME;
config.host = process.env.DB_HOST;
config.port = parseInt(process.env.DB_PORT || '5432', 10);
config.storage = ':memory:';
config.models = [path.join(__dirname, '/../models/*.model.ts')];
config.modelMatch = (filename, member) => filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
config.repositoryMode = true;
config.timezone = process.env.TZ || 'Europe/Kiev';
config.dialect = 'postgres';
config.logging = (sql) => log.debug(sql);
config.define = {
  timestamps: false,
  freezeTableName: true,
};

export default config;
