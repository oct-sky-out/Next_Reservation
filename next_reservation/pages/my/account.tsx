import Account from '@/components/My/Account/Account';
import { GetServerSideProps } from 'next';

const account = () => {
  return <Account />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.req.cookies['access_token']) {
    return {
      redirect: { statusCode: 302, destination: '/login' },
    };
  }
  return { props: {} };
};

export default account;
