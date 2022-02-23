import { GetServerSideProps, NextPage } from 'next';
import RyokanDetailPage from '@/components/RyokanDetailPage/RyokanDetailPage';

const ryokan: NextPage = () => {
  return <RyokanDetailPage />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.req.cookies['access_token']) {
    return {
      redirect: { statusCode: 302, destination: '/login' },
    };
  }
  return { props: {} };
};

export default ryokan;
