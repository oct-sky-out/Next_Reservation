import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import RegisterRyokan from '@/components/Register/RegisterRyokan/RegisterRyokan';
import RegisterConvenienceSpaces from '@/components/Register/RegisterConvenienceSpaces/RegisterConvenienceSpaces';

const convenienceSpaces: NextPage = () => {
  const router = useRouter();
  return (
    <RegisterRyokan
      producerText="편의 공간을 수정해주세요."
      priviousHref={`/room/manage/${router.query.ryokan}/amenities`}
      nextHref={`/room/manage/${router.query.ryokan}/ryokanPhotos`}
      step={6}
    >
      <RegisterConvenienceSpaces />
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

export default convenienceSpaces;
