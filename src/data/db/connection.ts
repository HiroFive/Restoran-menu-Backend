import { Sequelize, Dialect } from 'sequelize';
import config from '../../../config/db.config';

const db = process.env.NODE_ENV === 'test' ? config.test : config.development;

const sequelize = new Sequelize({
  ...db,
  port: Number(db.port),
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

export { sequelize };
