import { GetServerSideProps, NextPage } from 'next';

const ryokan: NextPage = () => {
  return <div>mypage</div>;
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
