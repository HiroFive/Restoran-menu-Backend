import { Router } from 'express';
import { ApiPath, HttpCode, CategoryApiPath } from '../../common/enums';
import { categoryService } from '../../services';
import { checkIsFound } from '../../helpers';
import { validationMiddleware } from '../../middleware';

const initCategoryApi = (apiRouter: Router): Router => {
  const categoryRouter = Router();
  apiRouter.use(ApiPath.CATEGORY, categoryRouter);

  categoryRouter.get(CategoryApiPath.ROOT, async (_req, res) => {
    try {
      const category = await categoryService.getAllCategoryByFilter(_req.query);
      res.status(checkIsFound(category)).json(category);
      
    } catch (error) {
      res
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  });

  categoryRouter.get(CategoryApiPath.FORMENU, async (_req, res) => {
    try {
      const category = await categoryService.getCategoryForMenu(_req.query);
      res.status(checkIsFound(category)).json(category);
    } catch (error) {
      res
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  });

  categoryRouter.get(CategoryApiPath.CHILDREN, async (_req, res) => {
    try {
      const category = await categoryService.getCategoryChildren();
      res.status(checkIsFound(category)).json(category);
    } catch (error) {
      res
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  });

  categoryRouter.get(CategoryApiPath.$ID, async (_req, res) => {
    try {
      const category = await categoryService.getCategoryById(_req.params.id);
      res.status(checkIsFound(category)).json(category);
    } catch (error) {
      res
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  });
  categoryRouter.post(
    CategoryApiPath.ROOT,
    validationMiddleware,
    async (_req, res) => {
      try {
        const category = await categoryService.createNewCategory(_req.body);
        res.status(HttpCode.OK).json(category);
      } catch (err) {
        const error = err.errors[0];
        console.log(error)
        res.status(HttpCode.BAD_REQUEST).json({ message: error.message });
      }
    }
  );
  categoryRouter.patch(
    CategoryApiPath.$ID,
    validationMiddleware,
    async (_req, res, next) => {
      try {
        const category = await categoryService.updateCategory(
          _req.params.id,
          _req.body
        );
        res.status(HttpCode.OK).json(category);
      } catch (err) {
        const error = err.errors[0];
        res.status(HttpCode.BAD_REQUEST).json({ message: error.message });
      }
    }
  );
  categoryRouter.delete(CategoryApiPath.$ID, async (_req, res) => {
    try {
      await categoryService.deleteCategory(_req.params.id);
      res.status(HttpCode.NO_CONTENT).json('Success');
    } catch (err) {
      const error = err.errors[0];
      res.status(HttpCode.BAD_REQUEST).json({ message: error.message });
    }
  });

  return categoryRouter;
};
export { initCategoryApi };
