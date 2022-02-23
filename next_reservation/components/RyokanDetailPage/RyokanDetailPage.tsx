import { useSelector } from '@/store/index';
import ReservationForm from './ReservationForm';
import RyokanDetailImage from './RyokanDetailImage';
import RyokanDetailPost from './RyokanDetailPost';

const RyokanDetailPage = () => {
  const isModalOpend = useSelector((state) => state.modalState.modalState);

  return (
    <div
      className={`w-screen h-screen text-black p-5 ${
        isModalOpend ? 'filter blur-sm' : ''
      }`}
    >
      <div className="w-3/4 h-3/4">
        <RyokanDetailImage />
      </div>
      <div className="w-3/4 h-2/3">
        <RyokanDetailPost />
      </div>
    </div>
  );
};

export default RyokanDetailPage;
