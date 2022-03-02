import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import RyokanFormWrapper from '@/components/RyokanForm/RyokanFormWrapper/RyokanFormWrapper';
import Amenities from '@/components/RyokanForm/Amenities/Amenities';

const amenities: NextPage = () => {
  const router = useRouter();
  return (
    <RyokanFormWrapper
      producerText="편의시설을 수정해주세요."
      priviousHref={`/room/manage/${router.query.ryokan}/geometry`}
      nextHref={`/room/manage/${router.query.ryokan}/convenienceSpaces`}
      step={5}
    >
      <Amenities />
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

export default amenities;
