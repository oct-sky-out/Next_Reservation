import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import RegisterRyokan from '@/components/Register/RegisterRyokan/RegisterRyokan';
import RegisterTitleAndDescription from '@/components/Register/ReigsterTitleAndDiscription/ReigsterTitleAndDiscription';

const titleAndDiscription: NextPage = () => {
  const router = useRouter();
  return (
    <RegisterRyokan
      producerText="고객들이 볼 제목과 설명을 수정하세요."
      priviousHref={`/room/manage/${router.query.ryokan}/ryokanPhotos`}
      nextHref={`/room/manage/${router.query.ryokan}/pricePerDay`}
      step={8}
    >
      <RegisterTitleAndDescription />
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

export default titleAndDiscription;
