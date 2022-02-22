import ReservationForm from './ReservationForm';
import RyokanDetailImage from './RyokanDetailImage';
import RyokanDetailPost from './RyokanDetailPost';

const RyokanDetailPage = () => {
  return (
    <div>
      <RyokanDetailImage />
      <RyokanDetailPost />
      <div>
        <ReservationForm />
      </div>
    </div>
  );
};

export default RyokanDetailPage;
