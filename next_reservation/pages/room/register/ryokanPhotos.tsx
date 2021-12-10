import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import RegisterRyokan from '@/components/Register/RegisterRyokan/RegisterRyokan';
import RegisterRyokanPhotos from '@/components/Register/RegisterRyokanPhotos/RegisterRyokanPhotos';

const ryokanPhotos: NextPage = () => {
  return (
    <RegisterRyokan
      producerText="료칸 내/외부 사진을 올려주세요."
      priviousHref="/room/register/convenienceSpaces"
      nextHref="/room/register/description"
    >
      <RegisterRyokanPhotos />
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

export default ryokanPhotos;
