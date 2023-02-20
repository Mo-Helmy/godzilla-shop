import { getServerSession } from 'next-auth';
import SignupForm from '../../components/auth/SignupForm';
import { authOptions } from '../api/auth/[...nextauth]';

const SignupPage = () => {
  return <SignupForm />;
};

export const getServerSideProps = async ({ req, res, query }) => {
  const session = await getServerSession(req, res, authOptions);

  if (session)
    return {
      redirect: {
        destination: '/',
        permenant: false,
      },
    };

  return {
    props: { session },
  };
};

export default SignupPage;
