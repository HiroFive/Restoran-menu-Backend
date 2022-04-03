import { CategoryService } from './category-service/category.service';
import { FoodService } from './food-service/food.service';
import { UploadImageService } from './upload-image-service/upload-image.service';
import { InfoService } from './info-service/info.service';

const categoryService = new CategoryService();
const foodService = new FoodService();
const uploadImageService = new UploadImageService();
const infoService = new InfoService();

export { categoryService, foodService, uploadImageService, infoService };
