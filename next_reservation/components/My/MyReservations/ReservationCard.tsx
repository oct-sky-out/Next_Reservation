import { useRouter } from 'next/router';
import { MyReservation } from '@/types/reduxActionTypes/ReduxMyReservaitonType';
import ReservationEmbedImage from './ReservationEmbedImage';
import ReservationInformation from './ReservationInformation';
import ReservationRyokanInformation from './ReservationRyokanInformation';

interface IReservationCard {
  reservation: MyReservation;
}

const ReservationCard: React.FC<IReservationCard> = ({
  reservation: { reservedData, reservedRyokan },
}) => {
  const router = useRouter();

  const FIRST_PHOTO = 0;

  const moveRyokanDetailPage = () => {
    router.push(`/room/${reservedRyokan.title}`);
  };

  return (
    <div
      className="w-full flex relative cursor-pointer"
      onClick={moveRyokanDetailPage}
    >
      <div className="w-300">
        <ReservationEmbedImage photo={reservedRyokan.photos[FIRST_PHOTO]} />
      </div>
      <div className="w-1/4 p-3">
        <ReservationInformation reservedData={reservedData} />
      </div>
      <div className="p-3">
        <ReservationRyokanInformation reservedRyokan={reservedRyokan} />
      </div>
    </div>
  );
};

export default ReservationCard;
