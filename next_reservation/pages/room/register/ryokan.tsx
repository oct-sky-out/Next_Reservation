import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import RegisterRyokan from '@/components/Register/RegisterRyokan/RegisterRyokan';
import RegisterRyokanType from '@/components/Register/RegisterRyokanType/RegisterRyokanType';
import { serverSidePropsType } from 'types/registRyokanServerSidePropType';

const ryokan: NextPage<serverSidePropsType> = (props: serverSidePropsType) => {
  return (
    <RegisterRyokan
      priviousHref={props.priviousHref}
      nextHref="/room/register/bedrooms"
    >
      <RegisterRyokanType />
    </RegisterRyokan>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { priviousHref: context.req.headers.referer || '/' } };
};

export default ryokan;
