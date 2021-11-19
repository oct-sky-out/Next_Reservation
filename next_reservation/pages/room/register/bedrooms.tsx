import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import RegisterRyokan from '@/components/Register/RegisterRyokan/RegisterRyokan';
import RegisterRyokanBeedrooms from '@/components/Register/RegisterRyokanBedrooms/RegisterRyokanBeedrooms';
import { serverSidePropsType } from 'types/registRyokanServerSidePropType';

const ryokan: NextPage<serverSidePropsType> = (props: serverSidePropsType) => {
  return (
    <RegisterRyokan
      producerText="숙소에 얼마나 많은 인원이 숙박할 수 있나요?"
      priviousHref={props.priviousHref}
      nextHref="/room/register/restrooms"
    >
      <RegisterRyokanBeedrooms />
    </RegisterRyokan>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.req.cookies['access_token']) {
    return {
      redirect: { statusCode: 302, destination: '/login' },
    };
  }
  return { props: { priviousHref: context.req.headers.referer || '/' } };
};

export default ryokan;
