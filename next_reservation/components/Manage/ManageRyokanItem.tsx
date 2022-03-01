import { IRyokanType } from '@/types/reduxActionTypes/ReduxRegiserRyokanType';
import ManageButtons from './ManageButtons';
import ManageRyokanImage from './ManageRyokanImage';
import ManageRyokanPost from './ManageRyokanPost';

interface IManageRyokanItem {
  ryokan: IRyokanType;
}

const ManageRyokanItem: React.FC<IManageRyokanItem> = ({ ryokan }) => {
  return (
    <div className="w-full flex space-x-5 py-5">
      <div className="w-300 flex items-center">
        <ManageRyokanImage image={ryokan.photos[0]} />
      </div>
      <div className="w-full">
        <ManageRyokanPost ryokanPost={ryokan} />
      </div>
    </div>
  );
};

export default ManageRyokanItem;
