import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import RegisterRyokan from '@/components/Register/RegisterRyokan/RegisterRyokan';
import RegisterLocation from '@/components/Register/RegisterLocation/RegisterLocation';

const location: NextPage = () => {
  return (
    <RegisterRyokan
      producerText="숙소의 위치는 어디인가요?"
      priviousHref="/room/register/bathrooms"
      nextHref="/room/register/geometry"
      step={4}
    >
      <RegisterLocation />
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

export default location;
