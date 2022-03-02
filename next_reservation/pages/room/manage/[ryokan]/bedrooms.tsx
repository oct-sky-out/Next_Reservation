import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import RyokanFormWrapper from '@/components/RyokanForm/RyokanFormWrapper/RyokanFormWrapper';
import Bedrooms from '@/components/RyokanForm/Bedrooms/Bedrooms';

const bedrooms: NextPage = () => {
  const router = useRouter();
  return (
    <RyokanFormWrapper
      producerText="숙박인원을 수정해주세요."
      priviousHref={`/room/manage/${router.query.ryokan}/ryokan`}
      nextHref={`/room/manage/${router.query.ryokan}/bathrooms`}
      step={2}
    >
      <Bedrooms />
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

export default bedrooms;
