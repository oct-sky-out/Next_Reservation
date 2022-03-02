import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import RyokanFormWrapper from '@/components/RyokanForm/RyokanFormWrapper/RyokanFormWrapper';
import PricePerDay from '@/components/RyokanForm/PricePerDay/PricePerDay';

const pricePerDay: NextPage = () => {
  const router = useRouter();
  return (
    <RyokanFormWrapper
      producerText="1박당 가격을 수정하세요."
      priviousHref={`/room/manage/${router.query.ryokan}/titleAndDiscription`}
      nextHref={`/room/manage/${router.query.ryokan}/date`}
      step={9}
    >
      <PricePerDay />
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

export default pricePerDay;
