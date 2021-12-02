import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import RegisterRyokan from '@/components/Register/RegisterRyokan/RegisterRyokan';
import RegisterRyokanType from '@/components/Register/RegisterRyokanType/RegisterRyokanType';
import { serverSidePropsType } from 'types/registRyokanServerSidePropType';

const ryokan: NextPage<serverSidePropsType> = (props: serverSidePropsType) => {
  return (
    <RegisterRyokan
      producerText="호스팅 할 료칸유형을 선택해주세요."
      priviousHref="/"
      nextHref="/room/register/bedrooms"
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
