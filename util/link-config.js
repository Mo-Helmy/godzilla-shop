// import { env } from 'process';

const environment = process.env.NODE_ENV;
console.log('🚀 ~ file: link-config.js:2 ~ environment', environment);

console.log(
  '🚀 ~ file: aws-s3.js:12 ~ process.env.AWS_REGION:',
  process.env.AWS_REGION
);

let apiUrl = process.env.API_URL;
console.log('🚀 ~ file: link-config.js:7 ~ apiUrl', apiUrl);
let clientUrl = process.env.CLIENT_URL;
console.log('🚀 ~ file: link-config.js:9 ~ clientUrl', clientUrl);
let s3Url = process.env.S3_URL;

// let apiUrl;
// let clientUrl;

// if (environment === 'development') {
//   apiUrl = 'http://localhost:4000';
//   clientUrl = 'http://localhost:3000';
// } else {
//   apiUrl = 'http://godzilla.us-east-1.elasticbeanstalk.com/';
//   clientUrl = 'https://tshit-shop-djzi279ir-mo-helmy.vercel.app';
//   // clientUrl = 'https://tshit-shop-a5vur5cfb-mo-helmy.vercel.app';
// }

export { apiUrl, clientUrl, s3Url };
