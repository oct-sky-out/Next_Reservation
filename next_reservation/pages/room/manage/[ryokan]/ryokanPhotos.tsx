import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import RegisterRyokan from '@/components/Register/RegisterRyokan/RegisterRyokan';
import RegisterRyokanPhotos from '@/components/Register/RegisterRyokanPhotos/RegisterRyokanPhotos';

const ryokanPhotos: NextPage = () => {
  const router = useRouter();
  return (
    <RegisterRyokan
      producerText="료칸 내/외부 사진을 수정해주세요."
      priviousHref={`/room/manage/${router.query.ryokan}/convenienceSpaces`}
      nextHref={`/room/manage/${router.query.ryokan}/titleAndDiscription`}
      step={7}
    >
      <RegisterRyokanPhotos />
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

export default ryokanPhotos;
