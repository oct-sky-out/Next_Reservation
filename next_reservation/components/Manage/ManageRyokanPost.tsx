import { IRyokanType } from '@/types/reduxActionTypes/ReduxRegiserRyokanType';
import ManageButtons from './ManageButtons';

interface IManageRyokanPost {
  ryokanPost: Omit<IRyokanType, 'photos'>;
}

const ManageRyokanPost: React.FC<IManageRyokanPost> = ({ ryokanPost }) => {
  return (
    <div className="w-full h-full relative">
      <div>
        <h3 className="text-xl">제목</h3>
        <span className="text-lg">{ryokanPost.title}</span>
      </div>
      <div>
        <h3 className="text-xl">가격</h3>
        <span className="text-lg">₩ {ryokanPost.pricePerDay}</span>
      </div>
      <div>
        <h3 className="text-xl">개장일</h3>
        <span className="text-lg">
          {new Date(ryokanPost.date.openDate as string).toLocaleString(
            'ko-KR',
            { year: '2-digit', month: '2-digit', day: '2-digit' }
          )}
        </span>
      </div>
      <div>
        <h3 className="text-xl">종료일</h3>
        <span className="text-lg">
          {new Date(ryokanPost.date.closeDate as string).toLocaleString(
            'ko-KR',
            {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
            }
          )}
        </span>
      </div>
      <div>
        <ManageButtons />
      </div>
    </div>
  );
};

export default ManageRyokanPost;
