import { GetServerSideProps, NextPage } from 'next';
import MyReservations from '@/components/My/MyReservations/MyReservations';

const ryokan: NextPage = () => {
  return <MyReservations />;
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
