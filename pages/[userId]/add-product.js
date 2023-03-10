import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import React from 'react';
import AddDesignAndProductProcess from '../../components/add-product/AddDesignAndProductProcess';
import Layout from '../../components/layout/Layout';
import { axiosApi } from '../../util/axiosInstance';
import { authOptions } from '../api/auth/[...nextauth]';

const AddProductPage = ({ session, token, designsList, pagesCount }) => {
  return (
    <AddDesignAndProductProcess
      session={session}
      token={token}
      designsList={designsList}
      pagesCount={pagesCount}
    />
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
  const token = await getToken({ req, raw: true });

  const session = await getServerSession(req, res, authOptions);

  if (!session)
    return {
      redirect: {
        destination: '/auth/login',
        permenant: false,
      },
    };

  const isAutherized = session?.id === query.userId;
  const isAdminOrDesigner =
    session?.role === 'admin' || session?.role === 'designer';

  if (!(isAutherized && isAdminOrDesigner))
    return {
      redirect: {
        destination: '/',
        permenant: false,
      },
    };
  try {
    const pageSize = query.ps || 10;
    const page = query.p || 1;
    const response = await axiosApi.get(
      `/api/media/design/${query.userId}?ps=${pageSize}&p=${page}`,
      {
        headers: { Authorization: token },
      }
    );

    return {
      props: {
        session,
        token,
        designsList: response.data.designs,
        pagesCount: Math.ceil(response.data.designsCount / pageSize),
      },
    };
  } catch (error) {
    return {
      props: { session, token, designsList: [] },
    };
  }
};

export default AddProductPage;
