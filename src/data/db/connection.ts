import { Sequelize, Dialect } from 'sequelize';
import config from '../../../config/db.config';

const db = process.env.NODE_ENV === 'test' ? config.test : config.development;

const sequelize = new Sequelize({
  ...db,
  port: Number(db.port),
  dialect: db.dialect as Dialect,
  logging: false,
});

export { sequelize };
