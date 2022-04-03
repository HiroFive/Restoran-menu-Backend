import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize';
import { IFood } from '../../common/interfaces';
import { ModelName } from '../../common/enums';

interface foodInstance extends IFood, Model {}

const createFoodModel = (orm: Sequelize): ModelCtor<foodInstance> => {
  return orm.define<foodInstance>(
    ModelName.FOOD,
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      hidden: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      categoryId: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      portions: {
        allowNull: false,
        type: DataTypes.JSONB,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'food',
      underscored: true,
    }
  );
};
export default createFoodModel;
