import RoomSearchBar from './RoomSearchBar';
import MainPageSignBoard from './MainPageSignBoard';
import RecommendationRegion from './RecommendationRegion';

const MainPage = () => {
  return (
    <div className="h-screen relative ">
      <RoomSearchBar />
      <MainPageSignBoard />
      <RecommendationRegion />
    </div>
  );
};

export default MainPage;
