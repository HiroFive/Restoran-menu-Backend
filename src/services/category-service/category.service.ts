import { categoryRepository } from '../../data/repositories';
import { ICategory, IQueryParams } from '../../common/interfaces';
import { generateFilterByQueryParams } from '../../helpers';
import qs from 'qs';

class CategoryService {
  
  public getAllCategoryByFilter(
    params: qs.ParsedQs
  ): Promise<ICategory[] | null> {
    const filter: IQueryParams = generateFilterByQueryParams(params);
    return categoryRepository.getAllCategoryByFilter(filter);
  }

  public getCategoryWithFood(params: qs.ParsedQs): Promise<ICategory[]> {
    const filter: IQueryParams = generateFilterByQueryParams(params);
    return categoryRepository.getCategoryWithFood(filter);
  }

  public getCategoryChildren(): Promise<ICategory[]> {
    return categoryRepository.getCategoryChildren();
  }

  public getCategoryForMenu(params: qs.ParsedQs): Promise<ICategory[]> {
    const filter: IQueryParams = generateFilterByQueryParams(params);
    return categoryRepository.getCategoryForMenu(filter);
  }

  public getCategoryById(id: string): Promise<ICategory | null> {
    return categoryRepository.getById(id);
  }

  public createNewCategory(category: ICategory): Promise<ICategory> {
    return categoryRepository.createCategory(category);
  }

  public async updateCategory(
    id: string,
    data: ICategory
  ): Promise<ICategory[]> {
    return categoryRepository.updateById(id, data);
  }

  public deleteCategory(id: string): Promise<number> {
    return categoryRepository.deleteById(id);
  }
}

export { CategoryService };
