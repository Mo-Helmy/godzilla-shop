import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const aws_region = process.env.AWS_REGION;
const aws_access_key_id = process.env.AWS_ACCESS_KEY_ID;
const aws_secret_access_key = process.env.AWS_SECRET_ACCESS_KEY;
const aws_bucket = process.env.AWS_BUCKET;
console.log('🚀 ~ file: aws-s3.js:9 ~ aws_region:', aws_region);
console.log('🚀 ~ file: aws-s3.js:12 ~ aws_bucket:', aws_bucket);
console.log('🚀 ~ file: aws-s3.js:5 ~ aws_access_key_id:', aws_access_key_id);
console.log(
  '🚀 ~ file: aws-s3.js:7 ~ aws_secret_access_key:',
  aws_secret_access_key
);

const client = new S3Client({
  region: aws_region,
  // region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: aws_access_key_id,
    secretAccessKey: aws_secret_access_key,
  },
});

export const uploadImageToS3 = async (key, body) => {
  const command = new PutObjectCommand({
    Bucket: aws_bucket,
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

export const getS3SignedUrl = async (key, body) => {
  const command = new PutObjectCommand({
    Bucket: aws_bucket,
    Key: key,
    Body: body,
    ContentType: 'image/png',
  });

  const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });

  return signedUrl;
};
