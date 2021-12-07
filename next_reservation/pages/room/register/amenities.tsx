import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import RegisterRyokan from '@/components/Register/RegisterRyokan/RegisterRyokan';
import RegisterAmenities from '@/components/Register/RegisterAmenities/RegisterAmenities';

const amenities: NextPage = () => {
  return (
    <RegisterRyokan
      producerText="어떤 편의시설을 제공하시나요?"
      priviousHref="/room/register/geometry"
      nextHref="/room/register/convinencespace"
    >
      <RegisterAmenities />
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

export default amenities;
