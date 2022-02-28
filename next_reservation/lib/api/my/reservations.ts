import { reservedRyokanType } from '@/types/apiTyps/my/myReservationsId';
import { IRyokanType } from '@/types/reduxActionTypes/ReduxRegiserRyokanType';
import axios from '../index';

const reservations = async (userEmail: string) => {
  const reserveHistories = await axios.get<reservedRyokanType[]>(
    `/api/my/myReservationsId?email=${userEmail}`
  );
  const reserveIds = reserveHistories.data.map((history) => history.reserveId);

  const myReservaionRyokans = await axios.post<IRyokanType[]>(
    `/api/my/myReservations`,
    { reserveId: reserveIds }
  );

  return myReservaionRyokans.data.map((ryokan, index) => ({
    reservedRyokan: ryokan,
    reservedData: reserveHistories.data[index],
  }));
};

export default reservations;
