import { FoodModel } from '../models';
import { IFood } from '../../common/interfaces';
import { getFoodParams } from '../../helpers';

class FoodRepository {
  public getAll(): Promise<IFood[]> {
    return FoodModel.findAll(getFoodParams());
  }

  public getById(id: string): Promise<IFood | null> {
    return FoodModel.findByPk(id, getFoodParams());
  }

  public getAllWithFilter(filter: object = {}): Promise<IFood[] | null> {
    return FoodModel.findAll(
      getFoodParams('filter', filter)
    );
  }

  public createFood(food: IFood): Promise<IFood> {
    return FoodModel.create(food);
  }

  public async updateById(id: string, data: IFood): Promise<IFood[]> {
    const result = await FoodModel.update(data, {
      where: { id },
      returning: true,
    });
    return result[1];
  }

  public deleteById(id: string): Promise<number> {
    return FoodModel.destroy({
      where: { id },
    });
  }
}

export { FoodRepository };
