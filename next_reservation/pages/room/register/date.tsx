import { GetServerSideProps, NextPage } from 'next';
import RegisterRyokan from '@/components/Register/RegisterRyokan/RegisterRyokan';
import RegisterDate from '@/components/Register/RegisterDate/RegisterDate';

const date: NextPage = () => {
  return (
    <RegisterRyokan
      producerText="숙소의 위치정보가 일치하나요?"
      priviousHref="/room/register/pricePerDay"
      nextHref="/room/register/completion"
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
