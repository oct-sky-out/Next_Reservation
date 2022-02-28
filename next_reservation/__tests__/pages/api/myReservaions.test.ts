/**
 * @jest-environment node
 */

import { IRyokanType } from '@/types/reduxActionTypes/ReduxRegiserRyokanType';
import axios from 'axios';

type reservedRyokanType = {
  adultCount: number;
  childrenCount: number;
  infantsCount: number;
  checkIn: string;
  checkOut: string;
  reserveId: string;
};

test('내 예약리스트 출력 테스트.', async () => {
  try {
    const reserveHistories = await axios.get<reservedRyokanType[]>(
      `http://localhost:3000/api/my/myReservationsId?email=kms3335k@naver.com`
    );
    const reserveIds = reserveHistories.data.map(
      (history) => history.reserveId
    );

    const myReservaionRyokans = await axios.post<IRyokanType[]>(
      `http://localhost:3000/api/my/myReservations`,
      { reserveId: reserveIds }
    );

    console.log(
      myReservaionRyokans.data.map((ryokan, index) => ({
        reservedRyokan: ryokan,
        reservedData: reserveHistories.data[index],
      }))
    );
    expect(myReservaionRyokans.data).toHaveLength(2);
  } catch (err: any) {
    console.log(err);
    console.log(err.error_message);
  }
});

export {};
