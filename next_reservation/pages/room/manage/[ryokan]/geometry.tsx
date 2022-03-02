import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import RegisterRyokan from '@/components/Register/RegisterRyokan/RegisterRyokan';
import RegisterGeometry from '@/components/Register/RegisterGeometry/RegisterGeometry';

const RegisterGeometryHOCComponent = dynamic(
  async () => await RegisterGeometry,
  {
    ssr: false,
  }
);

const geometry: NextPage = () => {
  const router = useRouter();
  return (
    <RegisterRyokan
      producerText="숙소의 위치정보가 일치하나요?"
      priviousHref={`/room/manage/${router.query.ryokan}/location`}
      nextHref={`/room/manage/${router.query.ryokan}/amenities`}
      step={4}
    >
      <RegisterGeometryHOCComponent />
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

export default geometry;
