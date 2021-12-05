import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import RegisterRyokan from '@/components/Register/RegisterRyokan/RegisterRyokan';
import RegisterGeometry from '@/components/Register/RegisterGeometry/RegisterGeometry';

const RegisterGeometryHOCComponent = dynamic(
  async () => await RegisterGeometry,
  {
    ssr: false,
  }
);

const geometry: NextPage = () => {
  return (
    <RegisterRyokan
      producerText="숙소의 위치정보가 일치하나요?"
      priviousHref="/room/register/location"
      nextHref="/room/register/amenities"
    >
      <RegisterGeometryHOCComponent />
    </RegisterRyokan>
  );
};

export default geometry;
