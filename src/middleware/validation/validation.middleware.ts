import {
  infoSchema,
  foodSchema,
  categorySchema,
  foodPUTSchema,
  categoryPUTSchema,
} from '../../common/schemas';
import { HttpCode } from '../../common/enums';
import { ValidationError } from 'yup';

const validationErrorStatus = (error: ValidationError) => {
  switch (error.type) {
    case 'noUnknown':
      return HttpCode.UNPROCESSABLE_ENTITY;
    default:
      return HttpCode.BAD_REQUEST;
  }
};

const validationMiddleware = async (_req, res, next) => {
  const pathAndMethod = `path=${_req.originalUrl}/${
    _req.id === undefined ? '' : _req.id
  } method=${_req.method}`;
  const validParams = {
    strict: true,
    abortEarly: true,
  };
  switch (pathAndMethod) {
    case 'path=/api/info/ method=PATCH':
      try {
        _req.body = await infoSchema.validate(_req.body, validParams);
      } catch (error) {
        return res
          .status(validationErrorStatus(error))
          .json({ message: error.errors });
      }
      break;
    case `path=/api/category/${_req.params.id}/ method=PATCH`:
      try {
        _req.body = await categoryPUTSchema.validate(_req.body, validParams);
      } catch (error) {
        return res
          .status(validationErrorStatus(error))
          .json({ message: error.errors });
      }
      break;
    case 'path=/api/category/ method=POST':
      try {
        _req.body = await categorySchema.validate(_req.body, validParams);
      } catch (error) {
        return res
          .status(validationErrorStatus(error))
          .json({ message: error.errors });
      }
      break;
    case `path=/api/food/${_req.params.id}/ method=PATCH`:
      try {
        _req.body = await foodPUTSchema.validate(
          JSON.parse(_req.body.data),
          validParams,
        );
      } catch (error) {
        return res
          .status(validationErrorStatus(error))
          .json({ message: error.errors });
      }
      break;
    case 'path=/api/food/ method=POST':
      try {
        _req.body = await foodSchema.validate(
          JSON.parse(_req.body.data),
          validParams,
        );
      } catch (error) {
        return res
          .status(validationErrorStatus(error))
          .json({ message: error.errors });
      }
      break;
    default:
      break;
  }

  next();
};
export { validationMiddleware };
