import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize';
import { IInfo } from '../../common/interfaces';
import { ModelName } from '../../common/enums';

interface InfoInstance extends IInfo, Model {}

const createInfoModel = (orm: Sequelize): ModelCtor<InfoInstance> => {
  return orm.define<InfoInstance>(
    ModelName.INFO,
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      address: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      contacts: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      wifiPassword: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'info',
      underscored: true,
    }
  );
};
export default createInfoModel;
