import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import RyokanFormWrapper from '@/components/RyokanForm/RyokanFormWrapper/RyokanFormWrapper';
import RyokanType from '@/components/RyokanForm/RyokanType/RyokanType';
import { useRouter } from 'next/router';

const ryokan: NextPage = () => {
  const router = useRouter();
  return (
    <RyokanFormWrapper
      producerText="호스팅 할 료칸유형을 수정해주세요."
      priviousHref="/room/manage"
      nextHref={`/room/manage/${router.query.ryokan}/bedrooms`}
      step={1}
    >
      <RyokanType />
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

export default ryokan;
