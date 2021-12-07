import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import SignInModal from '@/components/Auth/SignInModal';

const ryokan: NextPage = () => {
  return (
    <div className="mt-48 flex justify-center items-center">
      <SignInModal />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.req.cookies['access_token']) {
    return {
      redirect: { statusCode: 302, destination: '/' },
    };
  }
  return { props: {} };
};

export default ryokan;
