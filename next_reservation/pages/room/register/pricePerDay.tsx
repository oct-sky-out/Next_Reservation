import { NextPage, GetServerSideProps } from 'next';
import RyokanFormWrapper from '@/components/RyokanForm/RyokanFormWrapper/RyokanFormWrapper';
import PricePerDay from '@/components/RyokanForm/PricePerDay/PricePerDay';

const pricePerDay: NextPage = () => {
  return (
    <RyokanFormWrapper
      producerText="1박당 가격을 정해주세요."
      priviousHref="/room/register/titleAndDiscription"
      nextHref="/room/register/date"
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
