import { useSelector } from '@/store/index';
import { ryokanDetailActions } from '@/store/ryokanDetail';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import RyokanDetailImage from './RyokanDetailImage';
import RyokanDetailPost from './RyokanDetailPost';

const RyokanDetailPage = () => {
  const { isModalOpend, ryokanDetail } = useSelector((state) => ({
    isModalOpend: state.modalState.modalState,
    ryokanDetail: state.ryokanDetail,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    const ryokanDetailJson = localStorage.getItem('ryokanDetail');
    if (ryokanDetail.id === '' && ryokanDetailJson) {
      dispatch(
        ryokanDetailActions.setRyokanDetail(JSON.parse(ryokanDetailJson))
      );
    }
  }, []);

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
