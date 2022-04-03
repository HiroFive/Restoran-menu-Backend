import { sequelize } from '../../data/db/connection';
import { foodAttribute } from './';
import { Op } from 'sequelize';

const defaultParamsAttributes = {
  attributes: ['id', 'title', 'hidden', 'parentId'],
};

const categoryWithFood = {
  ...defaultParamsAttributes,
  order: [
    [sequelize.models.category, 'created_at', 'ASC'],
    [
      { model: sequelize.models.category, as: 'childrenCategory' },
      { model: sequelize.models.food, as: 'food' },
      'created_at',
      'ASC',
    ],
  ],
  include: [
    {
      model: sequelize.models.food,
      attributes: foodAttribute,
      as: 'food',
    },
    {
      model: sequelize.models.category,
      as: 'childrenCategory',
      ...defaultParamsAttributes,
      include: [
        {
          model: sequelize.models.food,
          attributes: foodAttribute,
          as: 'food',
        },
      ],
    },
  ],
};

const getParamsByRole = (role: string, additionalParams: object) => {
  const paramsByRole: any = {
    menuCategory: {
      ...defaultParamsAttributes,
      order: [['created_at', 'ASC']],
      where: { parentId: null },
    },
    getByWithFood: {
      ...categoryWithFood,
      where: {
        ...additionalParams,
        parentId: null,
      },
    },
  };
  if (role === 'user') {
    paramsByRole.menuCategory.where.hidden = false;
    paramsByRole.getByWithFood.where.hidden = false;
    paramsByRole.getByWithFood.where['$childrenCategory.food.hidden$'] = {
      [Op.not]: true,
    };
  }
  return paramsByRole;
};
export const getCategoryParams = (
  type = '',
  additionalParams: object = {},
  role = 'user',
) => {
  delete additionalParams['role'];
  const paramsByRole = getParamsByRole(role, additionalParams);
  switch (type) {
    case 'menu category':
      return paramsByRole.menuCategory;
    case 'getByWithFood':
      return paramsByRole.getByWithFood;
    case 'children':
      return {
        ...defaultParamsAttributes,
        where: { parentId: { [Op.not]: null } },
      };
    case 'getBy':
      return { ...defaultParamsAttributes, where: additionalParams };
    default:
      return defaultParamsAttributes;
  }
};
