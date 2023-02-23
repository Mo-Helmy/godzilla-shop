import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// import config from './env-config';

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadImageToS3 = async (key, body) => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    Body: body,
    ContentType: 'image/png',
  });

  const result = await client.send(command);
  console.log('🚀 ~ file: aws-s3.js:15 ~ uploadImageToS3 ~ result:', result);
  console.log(
    'Successfully created ' +
      key +
      ' and uploaded it to ' +
      process.env.AWS_BUCKET +
      '/' +
      key
  );
};
