import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import RegisterRyokan from '@/components/Register/RegisterRyokan/RegisterRyokan';
import RegisterDate from '@/components/Register/RegisterDate/RegisterDate';

const date: NextPage = () => {
  const router = useRouter();
  return (
    <RegisterRyokan
      producerText="개장일과 종료일을 수정하세요."
      priviousHref={`/room/manage/${router.query.ryokan}/pricePerDay`}
      nextHref={`/room/manage/${router.query.ryokan}/completion`}
      step={10}
    >
      <RegisterDate />
    </RegisterRyokan>
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
