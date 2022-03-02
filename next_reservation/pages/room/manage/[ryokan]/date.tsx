import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import RyokanFormWrapper from '@/components/RyokanForm/RyokanFormWrapper/RyokanFormWrapper';
import RegisterDate from '@/components/RyokanForm/RegisterDate/RegisterDate';

const date: NextPage = () => {
  const router = useRouter();
  return (
    <RyokanFormWrapper
      producerText="개장일과 종료일을 수정하세요."
      priviousHref={`/room/manage/${router.query.ryokan}/pricePerDay`}
      nextHref={`/room/manage/${router.query.ryokan}/completion`}
      step={10}
    >
      <RegisterDate />
    </RyokanFormWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.req.cookies['access_token']) {
    return {
      redirect: { statusCode: 302, destination: '/login' },
    };
  }
  return { props: {} };
};

export default date;
