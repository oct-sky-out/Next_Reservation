import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import RegisterRyokan from '@/components/Register/RegisterRyokan/RegisterRyokan';

type serverSidePropsType = { priviousHref: string };

const ryokan: NextPage<serverSidePropsType> = (props: serverSidePropsType) => {
  return <RegisterRyokan priviousHref={props.priviousHref} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { priviousHref: context.req.headers.referer } };
};

export default ryokan;
