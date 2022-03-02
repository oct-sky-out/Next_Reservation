import ManageButtons from './ManageButtons';
import { RyokanManageType } from '@/types/apiTyps/ryokan/RyokanManage';
import ryokan from 'pages/login';

interface IManageRyokanPost {
  ryokan: RyokanManageType;
}

const ManageRyokanPost: React.FC<IManageRyokanPost> = ({ ryokan }) => {
  return (
    <div className="w-full h-full relative">
      <div>
        <h3 className="text-xl">제목</h3>
        <span className="text-lg">{ryokan.title}</span>
      </div>
      <div>
        <h3 className="text-xl">가격</h3>
        <span className="text-lg">₩ {ryokan.pricePerDay}</span>
      </div>
      <div>
        <h3 className="text-xl">개장일</h3>
        <span className="text-lg">
          {new Date(ryokan.date.openDate as string).toLocaleString('ko-KR', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
          })}
        </span>
      </div>
      <div>
        <h3 className="text-xl">종료일</h3>
        <span className="text-lg">
          {new Date(ryokan.date.closeDate as string).toLocaleString('ko-KR', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
          })}
        </span>
      </div>
      <div>
        <ManageButtons ryokan={ryokan} ryokanId={ryokan.ryokanId} />
      </div>
    </div>
  );
};

export default ManageRyokanPost;
