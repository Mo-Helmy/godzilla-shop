import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  mongodb_uri: process.env.MONGODB_URI,
  token_secret: process.env.TOKEN_SECRET,
  aws_region: process.env.AWS_REGION,
  aws_profile: process.env.AWS_PROFILE,
  aws_media_bucket: process.env.AWS_BUCKET,
};

export default config;
