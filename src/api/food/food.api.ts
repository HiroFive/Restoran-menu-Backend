import { Router } from 'express';
import { ApiPath, HttpCode, FoodApiPath } from '../../common/enums';
import {
  foodService,
  uploadImageService,
  categoryService,
} from '../../services';
import { multerUploadFile, validationMiddleware } from '../../middleware';
import { checkIsFound } from '../../helpers';

const initFoodApi = (apiRouter: Router): Router => {
  const foodRouter = Router();
  const upload = multerUploadFile();

  apiRouter.use(ApiPath.FOOD, foodRouter);

  foodRouter.get(FoodApiPath.ROOT, async (_req, res) => {
    try {
      const food = await foodService.getAllWithFilter(_req.query);
      res.status(checkIsFound(food)).json(food);
    } catch (error) {
      res
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  });

  foodRouter.get(FoodApiPath.BY_CATEGORY, async (_req, res) => {
    try {
      const food = await categoryService.getCategoryWithFood(_req.query);
      res.status(checkIsFound(food)).json(food);
    } catch (error) {
      res
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  });

  foodRouter.get(FoodApiPath.$ID, async (_req, res) => {
    try {
      const food = await foodService.getFoodById(_req.params.id);
      res.status(checkIsFound(food)).json(food);
    } catch (error) {
      res
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  });

  foodRouter.post(
    FoodApiPath.ROOT,
    upload.single('image'),
    validationMiddleware,
    async (_req, res) => {
      try {
        _req.body.image = await uploadImageService.uploadImage(_req.file);
        const food = await foodService.createNewFood(_req.body);
        res.status(HttpCode.OK).json(food);
      } catch (err) {
        const error = err.errors[0];
        uploadImageService.deleteUploadedImage(error.instance.image);
        res.status(HttpCode.BAD_REQUEST).json({ message: error.message });
      }
    },
  );

  foodRouter.patch(
    FoodApiPath.$ID,
    upload.single('image'),
    validationMiddleware,
    async (_req, res) => {
      try {
        if (_req.file) {
          console.log(_req.body)
          uploadImageService.deleteUploadedImage(_req.body.image)
          _req.body.image = await uploadImageService.uploadImage(_req.file);
        }
        const food = await foodService.updateFood(_req.params.id, _req.body);
        res.status(HttpCode.OK).json(food);
      } catch (err) {
        const error = err.errors[0];
        uploadImageService.deleteUploadedImage(error.instance.image);
        res
          .status(HttpCode.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
    },
  );
  foodRouter.delete(FoodApiPath.$ID, async (_req, res) => {
    try {
      await foodService.deleteFood(_req.params.id);
      res.status(HttpCode.NO_CONTENT).json('Success');
    } catch (err) {
      const error = err.errors[0];
      res
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  });

  return foodRouter;
};
export { initFoodApi };
