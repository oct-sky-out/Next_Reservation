import { MdAlarmOff, MdAlarmOn, MdPeople } from 'react-icons/md';
import { reservedRyokanType } from '@/types/apiTyps/my/myReservationsId';

interface IReservationInformation {
  reservedData: reservedRyokanType;
}

const ReservationInformation: React.FC<IReservationInformation> = ({
  reservedData,
}) => {
  const parseLocalDate = (date: Date) =>
    date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long',
    });

  return (
    <>
      <h3 className="text-2xl">예약정보</h3>
      <div className="flex items-center space-x-3">
        <MdPeople size="26" color="#138a6c" />
        <span className="text-lg">
          인원수 :{' '}
          {reservedData.adultCount +
            reservedData.childrenCount +
            reservedData.infantsCount}
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <MdAlarmOn size="26" color="#138a6c" />
        <span className="text-lg">
          체크인 :{parseLocalDate(new Date(reservedData.checkIn))}
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <MdAlarmOff size="26" color="#138a6c" />
        <span className="text-lg">
          체크아웃 :{parseLocalDate(new Date(reservedData.checkOut))}
        </span>
      </div>
    </>
  );
};

export default ReservationInformation;
