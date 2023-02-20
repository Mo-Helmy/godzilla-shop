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
        S3_URL: 'https://solo-godzilla.s3.us-east-1.amazonaws.com',
        MONGODB_URL:
          'mongodb+srv://mohelmy:xJka4LH9GuEoF3xW@cluster0.s13ivsk.mongodb.net/godzilla2?retryWrites=true&w=majority',
        BCRYPT_SECRET: 'mohelmyM0H3IMY',
        NEXTAUTH_URL: 'http://localhost:3000',
        NEXTAUTH_SECRET: 'mohelmyM0H3IMYmohelmyM0H3IMYmohelmyM0H3IMY',
        GOOGLE_CLIENT_ID:
          '1033327395893-4qvk1klp87v18mnbvpe5399srhui1ln5.apps.googleusercontent.com',
        GOOGLE_CLIENT_SECRET: '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',
        SENDGRID_API_KEY:
          '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',
        SENDGRID_FROM_EMAIL: 'engmhelmy.1990@gmail.com',
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

    // env: {
    //   API_URL: 'https://api.solo-godzilla.online',
    //   CLIENT_URL: 'http://localhost:3000',
    //   S3_URL: 'https://solo-godzilla.s3.us-east-1.amazonaws.com',
    //   MONGODB_URL:
    //     'mongodb+srv://mohelmy:xJka4LH9GuEoF3xW@cluster0.s13ivsk.mongodb.net/godzilla2?retryWrites=true&w=majority',
    //   BCRYPT_SECRET: 'mohelmyM0H3IMY',
    //   NEXTAUTH_URL: 'http://localhost:3000',
    //   NEXTAUTH_SECRET: 'mohelmyM0H3IMYmohelmyM0H3IMYmohelmyM0H3IMY',
    //   GOOGLE_CLIENT_ID:
    //     '1033327395893-4qvk1klp87v18mnbvpe5399srhui1ln5.apps.googleusercontent.com',
    //   GOOGLE_CLIENT_SECRET: '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',
    //   SENDGRID_API_KEY:
    //     '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',
    //   SENDGRID_FROM_EMAIL: 'engmhelmy.1990@gmail.com',
    // },
    env: {
      API_URL: 'https://api.solo-godzilla.online',
      CLIENT_URL: 'https://godzilla-shop.vercel.app',
      S3_URL: 'https://solo-godzilla.s3.us-east-1.amazonaws.com',
      MONGODB_URL:
        'mongodb+srv://mohelmy:xJka4LH9GuEoF3xW@cluster0.s13ivsk.mongodb.net/godzilla2?retryWrites=true&w=majority',
      BCRYPT_SECRET: 'mohelmyM0H3IMY',
      NEXTAUTH_URL: 'https://godzilla-shop.vercel.app',
      NEXTAUTH_SECRET: 'mohelmyM0H3IMYmohelmyM0H3IMYmohelmyM0H3IMY',
      GOOGLE_CLIENT_ID:
        '1033327395893-4qvk1klp87v18mnbvpe5399srhui1ln5.apps.googleusercontent.com',
      GOOGLE_CLIENT_SECRET: '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',
      SENDGRID_API_KEY:
        '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',
      SENDGRID_FROM_EMAIL: 'engmhelmy.1990@gmail.com',
    },
  };
};

module.exports = nextConfig;
