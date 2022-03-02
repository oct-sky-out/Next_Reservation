import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import RegisterRyokan from '@/components/Register/RegisterRyokan/RegisterRyokan';
import RegisterPricePerDay from '@/components/Register/RegisterPricePerDay/RegisterPricePerDay';

const pricePerDay: NextPage = () => {
  const router = useRouter();
  return (
    <RegisterRyokan
      producerText="1박당 가격을 수정하세요."
      priviousHref={`/room/manage/${router.query.ryokan}/titleAndDiscription`}
      nextHref={`/room/manage/${router.query.ryokan}/date`}
      step={9}
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
