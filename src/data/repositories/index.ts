import { FoodRepository } from './food.repository';
import { CategoryRepository } from './category.repository';
import { InfoRepository } from './info.repository';

const foodRepository = new FoodRepository();
const categoryRepository = new CategoryRepository();
const infoRepository = new InfoRepository();

export { foodRepository, categoryRepository, infoRepository };
