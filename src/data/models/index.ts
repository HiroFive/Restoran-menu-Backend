import { sequelize } from '../db/connection';

import createCategoryModel from './category.model';
import createFoodModel from './food.model';
import createInfoModel from './info.model';

const CategoryModel = createCategoryModel(sequelize);
const FoodModel = createFoodModel(sequelize);
const InfoModel = createInfoModel(sequelize);

CategoryModel.hasMany(FoodModel, {
  as: 'food',
});
CategoryModel.hasMany(CategoryModel, {
  as: 'childrenCategory',
  foreignKey: 'parent_id',
});
CategoryModel.belongsTo(sequelize.models.category, {
  foreignKey: 'parent_id',
});
FoodModel.belongsTo(sequelize.models.category);

export { CategoryModel, FoodModel, InfoModel };
