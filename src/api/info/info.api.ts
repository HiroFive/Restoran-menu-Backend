import { Router } from 'express';
import { ApiPath, HttpCode, InfoApiPath } from '../../common/enums';
import { infoService } from '../../services';
import { validationMiddleware } from '../../middleware';

const initInfoApi = (apiRouter: Router): Router => {
  const infoRouter = Router();

  apiRouter.use(ApiPath.INFO, infoRouter);

  infoRouter.get(InfoApiPath.ROOT, async (_req, res) => {
    try {
      const info = await infoService.getInfo();
      res.status(HttpCode.OK).json(info);
    } catch (error) {
      res.status(HttpCode.NOT_FOUND).json(error);
    }
  });

  infoRouter.patch(
    InfoApiPath.ROOT,
    validationMiddleware,
    async (_req, res) => {
      try {
        let info1 = await infoService.getInfo();
        if (info1 === undefined) {
          info1 = await infoService.createInfo();
        }
        const info = await infoService.updateInfo(info1.id, _req.body);
        res.status(HttpCode.OK).json(info);
      } catch (err) {
        const error = err.errors[0];
        res
          .status(HttpCode.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
    }
  );

  return infoRouter;
};
export { initInfoApi };
