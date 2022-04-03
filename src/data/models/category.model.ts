import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize';
import { ICategory, ICategoryWithChildren } from '../../common/interfaces';
import { ModelName } from '../../common/enums';

interface CategoryInstance extends ICategoryWithChildren, Model {}

const createCategoryModel = (orm: Sequelize): ModelCtor<CategoryInstance> => {
  return orm.define<CategoryInstance>(
    ModelName.CATEGORY,
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      hidden: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      parentId: {
        allowNull: true,
        type: DataTypes.STRING,
        defaultValue: null,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'category',
      underscored: true,
    },
  );
};
export default createCategoryModel;
