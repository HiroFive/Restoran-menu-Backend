import cloudinary from '../../../config/cloudinary.config';

class UploadImageService {
  public async uploadImage(file: Express.Multer.File): Promise<string> {
    const cloudResponse = await cloudinary.uploader.upload(file.path);
    return `${cloudResponse.url}`;
  }

  public async deleteUploadedImage(url: string): Promise<void> {
    const convertedUrl = url.split('/');
    const imagePublicId = convertedUrl[convertedUrl.length - 1].split('.')[0];
    cloudinary.uploader.destroy(imagePublicId);
  }
}
export { UploadImageService };
