import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import RegisterRyokan from '@/components/Register/RegisterRyokan/RegisterRyokan';
import RegisterConvenienceSpaces from '@/components/Register/RegisterConvenienceSpaces/RegisterConvenienceSpaces';

const convenienceSpaces: NextPage = () => {
  return (
    <RegisterRyokan
      producerText="게스트가 어떤 공간을 사용할 수 있나요?"
      priviousHref="/room/register/amenities"
      nextHref="/room/register/roomImages"
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
