import { RyokanType as RyokanTypes } from '@/lib/staticData/RegisterRyokanType';
import { IRyokanType } from '@/types/reduxActionTypes/ReduxRyokanType';
interface IReservationRyokanInformation {
  reservedRyokan: Omit<IRyokanType, 'photos'>;
}

const ReservationRyokanInformation: React.FC<IReservationRyokanInformation> = ({
  reservedRyokan,
}) => {
  return (
    <>
      <h3 className="text-2xl"></h3>
      <div className="flex items-center space-x-3">
        <span className="text-xl">제목 : {reservedRyokan.title}</span>
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-xl">
          료칸유형 : {RyokanTypes[reservedRyokan.ryokanType]}
        </span>
      </div>
      <div className="flex items-center space-x-3 absolute bottom-0 left-1/4">
        <span className="text-2xl text-emerald">
          1박 : ₩ {reservedRyokan.pricePerDay}
        </span>
      </div>
    </>
  );
};

export default ReservationRyokanInformation;
