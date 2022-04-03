import { infoRepository } from '../../data/repositories';
import { IInfo } from '../../common/interfaces';

class InfoService {
  public getInfo(): Promise<IInfo> {
    return infoRepository.getInfo();
  }

  public async updateInfo(id: string, data: IInfo): Promise<IInfo[]> {
    return infoRepository.updateById(id, data);
  }

  public async createInfo(
    data: IInfo = { address: '', contacts: '', wifiPassword: '' }
  ): Promise<IInfo> {
    return infoRepository.createInfo(data);
  }
}

export { InfoService };
