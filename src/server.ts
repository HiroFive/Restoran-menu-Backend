import { join } from 'path';
import express, { json, urlencoded } from 'express';
import { AppConfig } from './common/enums';
import { initApi } from './api/api';
import { sequelize } from './data/db/connection';
import { DbConnectionError } from './exceptions';
import { logRequest, validationMiddleware } from './middleware';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from '../docs';
import cors from 'cors';

// import 

const app = express();

sequelize
  .authenticate()
  .then(() => {
    return console.log('Database connection was successful');
  })
  .catch(({ message, stack }: DbConnectionError) => {
    return console.error(message, stack);
  });

app.use(cors());
app.use(logRequest);
// app.use(validationMiddleware);
app.use(json({ limit: '670kb' }));
app.use(urlencoded({ extended: true }));

initApi(app);

const docs = swaggerJSDoc(swaggerConfig);


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'DELETE, PATCH, GET, POST');
  next();
});

initApi(app);

app.use(AppConfig.DOCS, swaggerUi.serve, swaggerUi.setup(docs));

export { app };
