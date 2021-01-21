import multer from 'multer';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';
import 'dotenv/config';
import { Request } from 'express';

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
  });
  
const upload= multer({
    storage: multerS3({
      s3,
      bucket: 'bitda-images',
      acl: 'public-read',
      key: function(req:Request, file:Express.Multer.File, cb) {
        cb(null, `drinks-images/${Date.now()}${file.originalname}`);
      },
    }),
  });
  export default upload;