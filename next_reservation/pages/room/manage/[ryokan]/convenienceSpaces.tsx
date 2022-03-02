import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import RyokanFormWrapper from '@/components/RyokanForm/RyokanFormWrapper/RyokanFormWrapper';
import ConvenienceSpaces from '@/components/RyokanForm/ConvenienceSpaces/ConvenienceSpaces';

const convenienceSpaces: NextPage = () => {
  const router = useRouter();
  return (
    <RyokanFormWrapper
      producerText="편의 공간을 수정해주세요."
      priviousHref={`/room/manage/${router.query.ryokan}/amenities`}
      nextHref={`/room/manage/${router.query.ryokan}/ryokanPhotos`}
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
