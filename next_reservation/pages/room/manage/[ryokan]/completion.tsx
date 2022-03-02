import RegisterCompletion from '@/components/RyokanForm/Completion/Completion';
import { GetServerSideProps, NextPage } from 'next';

const completion: NextPage = () => {
  return <RegisterCompletion />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.req.cookies['access_token']) {
    return {
      redirect: { statusCode: 302, destination: '/login' },
    };
  }
  return { props: {} };
};

export default completion;
