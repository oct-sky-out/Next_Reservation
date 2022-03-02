import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import RyokanFormWrapper from '@/components/RyokanForm/RyokanFormWrapper/RyokanFormWrapper';
import TitleAndDiscription from '@/components/RyokanForm/TitleAndDiscription/TitleAndDiscription';

const titleAndDiscription: NextPage = () => {
  const router = useRouter();
  return (
    <RyokanFormWrapper
      producerText="고객들이 볼 제목과 설명을 수정하세요."
      priviousHref={`/room/manage/${router.query.ryokan}/ryokanPhotos`}
      nextHref={`/room/manage/${router.query.ryokan}/pricePerDay`}
      step={8}
    >
      <TitleAndDiscription />
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

export default titleAndDiscription;
