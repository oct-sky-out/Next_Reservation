import ManageRyokanImage from './ManageRyokanImage';
import ManageRyokanPost from './ManageRyokanPost';
import { RyokanManageType } from '@/types/apiTyps/ryokan/RyokanManage';

interface IManageRyokanItem {
  ryokan: RyokanManageType;
}

const ManageRyokanItem: React.FC<IManageRyokanItem> = ({ ryokan }) => {
  return (
    <div className="w-full flex space-x-5 py-5">
      <div className="w-300 flex items-center">
        <ManageRyokanImage image={ryokan.photos[0]} />
      </div>
      <div className="w-full">
        <ManageRyokanPost ryokan={ryokan} />
      </div>
    </div>
  );
};

export default ManageRyokanItem;
