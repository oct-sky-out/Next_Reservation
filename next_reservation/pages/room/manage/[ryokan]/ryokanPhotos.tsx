import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import RyokanFormWrapper from '@/components/RyokanForm/RyokanFormWrapper/RyokanFormWrapper';
import RyokanPhotos from '@/components/RyokanForm/RyokanPhotos/RyokanPhotos';

const ryokanPhotos: NextPage = () => {
  const router = useRouter();
  return (
    <RyokanFormWrapper
      producerText="료칸 내/외부 사진을 수정해주세요."
      priviousHref={`/room/manage/${router.query.ryokan}/convenienceSpaces`}
      nextHref={`/room/manage/${router.query.ryokan}/titleAndDiscription`}
      step={7}
    >
      <RyokanPhotos />
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

export default ryokanPhotos;
