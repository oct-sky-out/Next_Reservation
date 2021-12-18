import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import RegisterRyokan from '@/components/Register/RegisterRyokan/RegisterRyokan';
import RegisterRyokanBedrooms from '@/components/Register/RegisterRyokanBedrooms/RegisterRyokanBedrooms';

const bedrooms: NextPage = () => {
  return (
    <RegisterRyokan
      producerText="얼마나 많은 인원이 숙박할 수 있나요?"
      priviousHref="/room/register/ryokan"
      nextHref="/room/register/bathrooms"
      step={2}
    >
      <RegisterRyokanBedrooms />
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

export default bedrooms;
