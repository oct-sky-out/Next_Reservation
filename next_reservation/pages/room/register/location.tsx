import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import RyokanFormWrapper from '@/components/RyokanForm/RyokanFormWrapper/RyokanFormWrapper';
import Location from '@/components/RyokanForm/Location/Location';

const location: NextPage = () => {
  return (
    <RyokanFormWrapper
      producerText="숙소의 위치는 어디인가요?"
      priviousHref="/room/register/bathrooms"
      nextHref="/room/register/geometry"
      step={4}
    >
      <Location />
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

export default location;
