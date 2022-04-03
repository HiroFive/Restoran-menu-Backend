import { CategoryModel } from '../models';
import { ICategory, IQueryParams } from '../../common/interfaces';
import { getCategoryParams } from '../../helpers';

class CategoryRepository {
  public getAllCategoryByFilter(
    filter: IQueryParams,
  ): Promise<ICategory[] | null> {
    return CategoryModel.findAll(getCategoryParams('getBy', filter));
  }

  public getCategoryWithFood(filter: IQueryParams): Promise<ICategory[]> {
    return CategoryModel.findAll(
      getCategoryParams('getByWithFood', filter, `${filter.role}`),
    );
  }

  public getCategoryChildren(): Promise<ICategory[]> {
    return CategoryModel.findAll(
      getCategoryParams('children'),
    );
  }

  public getCategoryForMenu(filter: IQueryParams): Promise<ICategory[]> {
    return CategoryModel.findAll(
      getCategoryParams('menu category', {}, `${filter.role}`),
    );
  }

  public getById(id: string): Promise<ICategory | null> {
    return CategoryModel.findByPk(id, getCategoryParams());
  }

  public createCategory(category: ICategory): Promise<ICategory> {
    return CategoryModel.create(category);
  }

  public async updateById(id: string, data: ICategory): Promise<ICategory[]> {
    const result = await CategoryModel.update(data, {
      where: { id },
      returning: true,
    });
    return result[1];
  }

  public deleteById(id: string): Promise<number> {
    return CategoryModel.destroy({
      where: { id },
    });
  }
}

export { CategoryRepository };
