import { InfoModel } from '../models';
import { IInfo } from '../../common/interfaces';

class InfoRepository {
  public getInfo(): Promise<IInfo> {
    return InfoModel.findOne({
      attributes: ['id','address', 'contacts', 'wifiPassword']
    });
  }

  public createInfo(data: IInfo): Promise<IInfo> {
    return InfoModel.create(data);
  }

  public async updateById(id: string, data: IInfo): Promise<IInfo[]> {
    const result = await InfoModel.update(data, {
      where: { id },
      returning: true,
    });
    return result[1];
  }
}

export { InfoRepository };
