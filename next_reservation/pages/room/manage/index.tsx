import { GetServerSideProps, NextPage } from 'next';
import axios from '@/lib/api';
import ManageRyokan from '@/components/Manage/ManageRyokan';
import { RyokanManageType } from '@/types/apiTyps/ryokan/RyokanManage';

const manage: NextPage<{
  ryokans: RyokanManageType[];
}> = ({ ryokans }) => <ManageRyokan ryokans={ryokans} />;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (!req.cookies['access_token']) {
    return {
      redirect: { statusCode: 302, destination: '/login' },
    };
  }
  const ryokans = await axios.get('/api/my/ryokans');
  return { props: { ryokans: ryokans.data } };
};

export default manage;
