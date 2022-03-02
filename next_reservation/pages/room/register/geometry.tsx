import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import RyokanFormWrapper from '@/components/RyokanForm/RyokanFormWrapper/RyokanFormWrapper';
import Geometry from '@/components/RyokanForm/Geometry/Geometry';

const GeometryHOCComponent = dynamic(async () => await Geometry, {
  ssr: false,
});

const geometry: NextPage = () => {
  return (
    <RyokanFormWrapper
      producerText="숙소의 위치정보가 일치하나요?"
      priviousHref="/room/register/location"
      nextHref="/room/register/amenities"
      step={4}
    >
      <GeometryHOCComponent />
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

export default geometry;
