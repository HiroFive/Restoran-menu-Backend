import { foodRepository } from '../../data/repositories';
import { IFood, IQueryParams } from '../../common/interfaces';
import { generateFilterByQueryParams } from '../../helpers';
import qs from 'qs';

class FoodService {
  public getAllFood(): Promise<IFood[]> {
    return foodRepository.getAll();
  }

  public getFoodById(id: string): Promise<IFood | null> {
    return foodRepository.getById(id);
  }

  public async getAllWithFilter(params: qs.ParsedQs): Promise<IFood[] | null> {
    let filter: IQueryParams = generateFilterByQueryParams(params);
    return foodRepository.getAllWithFilter(filter);
  }

  public createNewFood(food: IFood): Promise<IFood> {
    return foodRepository.createFood(food);
  }

  public async updateFood(id: string, data: IFood): Promise<IFood[]> {
    return foodRepository.updateById(id, data);
  }

  public deleteFood(id: string): Promise<number> {
    return foodRepository.deleteById(id);
  }
}

export { FoodService };
