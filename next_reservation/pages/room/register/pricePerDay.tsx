import { NextPage, GetServerSideProps } from 'next';
import RegisterRyokan from '@/components/Register/RegisterRyokan/RegisterRyokan';
import RegisterPricePerDay from '@/components/Register/RegisterPricePerDay/RegisterPricePerDay';

const pricePerDay: NextPage = () => {
  return (
    <RegisterRyokan
      producerText="1박당 가격을 정해주세요."
      priviousHref="/room/register/titleAndDiscription"
      nextHref="/room/register/completion"
    >
      <RegisterPricePerDay />
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

export default pricePerDay;
