import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import RegisterRyokan from '@/components/Register/RegisterRyokan/RegisterRyokan';
import RegisterLocation from '@/components/Register/RegisterLocation/RegisterLocation';

const location: NextPage = () => {
  const router = useRouter();
  return (
    <RegisterRyokan
      producerText="숙소의 위치를 수정하세요."
      priviousHref={`/room/manage/${router.query.ryokan}/bathrooms`}
      nextHref={`/room/manage/${router.query.ryokan}/geometry`}
      step={4}
    >
      <RegisterLocation />
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

export default location;
