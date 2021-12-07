import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import RegisterRyokan from '@/components/Register/RegisterRyokan/RegisterRyokan';
import RegisterRyokanBathrooms from '@/components/Register/RegisterBathRooms/RegisterBathRooms';

const bathrooms: NextPage = () => {
  return (
    <RegisterRyokan
      producerText="게스트가 이용 할 수 있는 욕실 수를 입력해주세요."
      priviousHref="/room/register/bedrooms"
      nextHref="/room/register/location"
    >
      <RegisterRyokanBathrooms />
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
