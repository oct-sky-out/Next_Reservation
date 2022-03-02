import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import RyokanFormWrapper from '@/components/RyokanForm/RyokanFormWrapper/RyokanFormWrapper';
import ConvenienceSpaces from '@/components/RyokanForm/ConvenienceSpaces/ConvenienceSpaces';

const convenienceSpaces: NextPage = () => {
  return (
    <RyokanFormWrapper
      producerText="게스트가 어떤 공간을 사용할 수 있나요?"
      priviousHref="/room/register/amenities"
      nextHref="/room/register/ryokanPhotos"
      step={6}
    >
      <ConvenienceSpaces />
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

export default convenienceSpaces;
