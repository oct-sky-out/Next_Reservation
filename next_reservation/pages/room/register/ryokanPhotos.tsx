import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import RyokanFormWrapper from '@/components/RyokanForm/RyokanFormWrapper/RyokanFormWrapper';
import RyokanPhotos from '@/components/RyokanForm/RyokanPhotos/RyokanPhotos';

const ryokanPhotos: NextPage = () => {
  return (
    <RyokanFormWrapper
      producerText="료칸 내/외부 사진을 올려주세요."
      priviousHref="/room/register/convenienceSpaces"
      nextHref="/room/register/titleAndDiscription"
      step={7}
    >
      <RyokanPhotos />
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

export default ryokanPhotos;
