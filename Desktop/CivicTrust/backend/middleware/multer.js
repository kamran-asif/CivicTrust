import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'CivicTrust',
    allowed_formats: [
      'jpg',
      'jpeg',
      'png',
      'webp',
      'gif',
      'mp4',
      'mov',
      'avi',
      'mkv',
      'pdf',
    ],
    resource_type: 'auto',
    transformation: [{ width: 1600, height: 1600, crop: 'limit' }],
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024,
  },
});

export default upload;
