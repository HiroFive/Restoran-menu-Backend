import { sequelize } from '../../data/db/connection';

export const foodAttribute = [
  'id',
  'name',
  'description',
  'hidden',
  'categoryId',
  'image',
  'portions',
];

export const getFoodParams = (type = '', additionalParams = {}) => {
  const defaultParams = {
    attributes: foodAttribute,
    include: [
      {
        model: sequelize.models.category,
        as: 'category',
        attributes: ['id', 'title'],
      },
    ],
  };
  delete additionalParams['role'];
  switch (type) {
    case 'filter':
      return { ...defaultParams, where: { ...additionalParams } };
    default:
      return defaultParams;
  }
};
