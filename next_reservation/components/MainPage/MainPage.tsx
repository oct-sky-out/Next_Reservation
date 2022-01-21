import RoomSearchBar from './RoomSearchBar';
import { useSelector } from '@/store/index';
import MainPageSignBoard from './MainPageSignBoard';
import RecommendationRegion from './RecommendationRegion';

const MainPage = () => {
  const modalOpenState = useSelector(
    (selector) => selector.modalState.modalState
  );

  return (
    <div
      className={`h-full grid grid-cols-1 ${
        modalOpenState ? 'filter blur-md' : ''
      } bg-black`}
    >
      <RoomSearchBar />
      <MainPageSignBoard />
      <RecommendationRegion />
    </div>
  );
};

export default MainPage;
