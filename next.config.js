/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: false,
      images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '8080',
            pathname: '/api/**/*',
          },
          {
            protocol: 'https',
            hostname: 'solo-godzilla.s3.us-east-1.amazonaws.com',
            pathname: '/**/*',
          },
        ],
      },
      env: {
        API_URL: 'http://localhost:8080',
        CLIENT_URL: 'http://localhost:3000',
        S3_URL: process.env.S3_URL,
        MONGODB_URL: process.env.MONGODB_URL,
        BCRYPT_SECRET: process.env.BCRYPT_SECRET,
        NEXTAUTH_URL: 'http://localhost:3000',
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
        SENDGRID_FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL,

        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
        AWS_REGION: process.env.AWS_REGION,

        AWS_PROFILE: process.env.AWS_PROFILE,
        AWS_BUCKET: process.env.AWS_BUCKET,
      },
    };
  }

  return {
    reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '4000',
          pathname: '/api/**/*',
        },
        {
          protocol: 'https',
          hostname: 'api.solo-godzilla.online',
          port: '443',
          pathname: '/api/**/*',
        },
        {
          protocol: 'https',
          hostname: 'solo-godzilla.s3.us-east-1.amazonaws.com',
          pathname: '/**/*',
        },
      ],
    },

    env: {
      API_URL: 'https://api.solo-godzilla.online',
      CLIENT_URL: 'https://godzilla-shop.vercel.app',
      S3_URL: process.env.S3_URL,
      MONGODB_URL: process.env.MONGODB_URL,
      BCRYPT_SECRET: process.env.BCRYPT_SECRET,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
      SENDGRID_FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL,

      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      AWS_REGION: process.env.AWS_REGION,

      AWS_PROFILE: process.env.AWS_PROFILE,
      AWS_BUCKET: process.env.AWS_BUCKET,
    },
  };
};

module.exports = nextConfig;
