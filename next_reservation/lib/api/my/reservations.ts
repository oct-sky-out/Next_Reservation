import { reservedRyokanType } from '@/types/apiTyps/my/myReservationsId';
import { IRyokanType } from '@/types/reduxActionTypes/ReduxRyokanType';
import axios from '../index';

const reservations = async (userEmail: string) => {
  const reserveHistories = await axios.get<reservedRyokanType[]>(
    `/api/my/reservationsId?email=${userEmail}`
  );
  const reserveIds = reserveHistories.data.map((history) => history.reserveId);

  const myReservaionRyokans = await axios.post<IRyokanType[]>(
    `/api/my/reservations`,
    { reserveId: reserveIds }
  );

  return myReservaionRyokans.data.map((ryokan, index) => ({
    reservedRyokan: ryokan,
    reservedData: reserveHistories.data[index],
  }));
};

export default reservations;
