import { RequestHandler } from 'express';

const logRequest: RequestHandler = async (req, _res, next): Promise<void> => {
  console.log(`METHOD: ${req.method}, PATH:${req.path}`);

  return next();
};

export { logRequest };
