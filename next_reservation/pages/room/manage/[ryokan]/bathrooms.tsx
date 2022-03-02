import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import RegisterRyokan from '@/components/Register/RegisterRyokan/RegisterRyokan';
import RegisterRyokanBathrooms from '@/components/Register/RegisterBathRooms/RegisterBathRooms';

const bathrooms: NextPage = () => {
  const router = useRouter();
  return (
    <RegisterRyokan
      producerText="욕실정보를 수정해주세요."
      priviousHref={`/room/manage/${router.query.ryokan}/bedrooms`}
      nextHref={`/room/manage/${router.query.ryokan}/location`}
      step={3}
    >
      <RegisterRyokanBathrooms />
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

export default bathrooms;
