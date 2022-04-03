import { Router } from 'express';
import { AppConfig } from '../common/enums';

import { initCategoryApi } from './category/category.api';
import { initFoodApi } from './food/food.api';
import { initInfoApi} from './info/info.api';

const apis: any[] = [initCategoryApi, initFoodApi, initInfoApi];

const initApi = (app: Router): Router => {
  const apiRouter = Router();
  app.use(AppConfig.API_PREFIX, apiRouter);

  apis.forEach((api: any) => api(apiRouter));

  return apiRouter;
};

export { initApi };
