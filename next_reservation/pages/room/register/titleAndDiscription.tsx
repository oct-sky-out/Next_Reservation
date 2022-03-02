import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import RyokanFormWrapper from '@/components/RyokanForm/RyokanFormWrapper/RyokanFormWrapper';
import TitleAndDescription from '@/components/RyokanForm/TitleAndDiscription/TitleAndDiscription';

const titleAndDiscription: NextPage = () => {
  return (
    <RyokanFormWrapper
      producerText="고객들이 볼 제목과 설명을 올려주세요."
      priviousHref="/room/register/ryokanPhotos"
      nextHref="/room/register/pricePerDay"
      step={8}
    >
      <TitleAndDescription />
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

export default titleAndDiscription;
