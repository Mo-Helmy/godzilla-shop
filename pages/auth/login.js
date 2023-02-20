// import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import LoginForm from '../../components/auth/LoginForm';
import Loading from '../../components/UI/Loading';
// import { authOptions } from '../api/auth/[...nextauth]';

const LoginPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'authenticated') {
    router.push('/');
    return <Loading />;
  }

  return <LoginForm />;
};

// export const getServerSideProps = async ({ req, res, query }) => {
//   try {
//     const session = await getServerSession(req, res, authOptions);

//     if (session)
//       return {
//         redirect: {
//           destination: '/',
//           permenant: false,
//         },
//       };

//     return {
//       props: { session },
//     };
//   } catch (error) {
//     console.log('🚀 ~ file: login.js:30 ~ getServerSideProps ~ error', error);
//     return {
//       props: {},
//     };
//   }
// };

export default LoginPage;
