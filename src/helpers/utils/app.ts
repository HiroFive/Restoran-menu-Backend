import { HttpCode } from '../../common/enums';
import { Op } from 'sequelize';
import qs from 'qs';

export const checkIsFound = (res) => {
  return res === null || res.length === 0 ? HttpCode.NOT_FOUND : HttpCode.OK;
};

export const generateFilterByQueryParams = (params: qs.ParsedQs) => {
  let filter = {};
  for (let param in params) {
    if (
      param.includes('name') ||
      param.includes('title') ||
      param.includes('description')
    ) {
      filter = { ...filter, [param]: { [Op.iLike]: `%${params[param]}%` } };
    } else if (params[param] === 'null') {
      filter = { ...filter, [param]: null };
    } else {
      filter = { ...filter, [param]: params[param] };
    }
  }
  return filter;
};
