import { GetServerSideProps } from 'next';
import { wrapper } from '@/store/index';
import axios from '@/lib/api';

const completion = () => {
  return <div>Enter</div>;
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ res, req }) => {
    axios;
    return { props: {} };
  });

export default completion;
