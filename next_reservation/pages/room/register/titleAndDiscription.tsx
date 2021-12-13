import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import RegisterRyokan from '@/components/Register/RegisterRyokan/RegisterRyokan';
import RegisterTitleAndDescription from '@/components/Register/ReigsterTitleAndDiscription/ReigsterTitleAndDiscription';

const titleAndDiscription: NextPage = () => {
  return (
    <RegisterRyokan
      producerText="고객들이 볼 제목과 설명을 올려주세요."
      priviousHref="/room/register/ryokanPhotos"
      nextHref="/room/register/pricePerday"
    >
      <RegisterTitleAndDescription />
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

export default titleAndDiscription;
