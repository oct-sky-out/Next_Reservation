import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import RegisterRyokan from '@/components/RyokanForm/RyokanFormWrapper/RyokanFormWrapper';
import BathRooms from '@/components/RyokanForm/BathRooms/BathRooms';

const bathrooms: NextPage = () => {
  return (
    <RegisterRyokan
      producerText="게스트가 이용 할 수 있는 욕실 수를 입력해주세요."
      priviousHref="/room/register/bedrooms"
      nextHref="/room/register/location"
      step={3}
    >
      <BathRooms />
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

export default bathrooms;
