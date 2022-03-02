import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import RegisterRyokan from '@/components/Register/RegisterRyokan/RegisterRyokan';
import RegisterRyokanType from '@/components/Register/RegisterRyokanType/RegisterRyokanType';
import { useRouter } from 'next/router';

const ryokan: NextPage = () => {
  const router = useRouter();
  return (
    <RegisterRyokan
      producerText="호스팅 할 료칸유형을 수정해주세요."
      priviousHref="/room/manage"
      nextHref={`/room/manage/${router.query.ryokan}/bedrooms`}
      step={1}
    >
      <RegisterRyokanType />
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

export default ryokan;
