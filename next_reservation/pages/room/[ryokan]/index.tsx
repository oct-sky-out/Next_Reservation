import { GetServerSideProps, NextPage } from 'next';
import { wrapper } from '@/store/index';
import axios from '@/lib/api';
import RyokanDetailPage from '@/components/RyokanDetailPage/RyokanDetailPage';
import { RyokanSearchResultType } from '@/types/reduxActionTypes/ReduxSearchResultsRyokans';
import { ryokanDetailActions } from '@/store/ryokanDetail';
import { useDispatch } from 'react-redux';

const ryokan: NextPage<{ data: RyokanSearchResultType }> = ({ data }) => {
  const dispatch = useDispatch();
  dispatch(ryokanDetailActions.setRyokanDetail(data));
  return <RyokanDetailPage />;
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  if (!req.cookies['access_token']) {
    return {
      redirect: { statusCode: 302, destination: '/login' },
    };
  }
  if (!query) return { notFound: true };

  const { data } = await axios.get<RyokanSearchResultType>(
    `/api/ryokan/detail?title=${encodeURI(query.ryokan as string)}`
  );
  return { props: { data } };
};

export default ryokan;
