import { useSession } from 'next-auth/react';
import React from 'react';
import PageLayout from '../../layout/PageLayout';
import AddOrderProcess from './AddOrderProcess';

const AddOrderPageComponent = ({ userAddresses }) => {
  const { data: session } = useSession();
  return (
    <PageLayout
      items={[
        { value: 'Shop', url: '/shop' },
        { value: 'Cart', url: `/${session.id}/cart` },
        { value: 'Checkout', url: `/${session.id}/add-order` },
      ]}
    >
      <AddOrderProcess userAddresses={userAddresses} />
    </PageLayout>
  );
};

export default AddOrderPageComponent;
