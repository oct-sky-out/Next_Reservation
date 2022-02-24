/**
 * @jest-environment node
 */

import axios from 'axios';

test('내 예약리스트 출력 테스트.', async () => {
  try {
    const reserveIds = await axios.get(
      `http://localhost:3000/api/my/myReservationsId?email=abc@naver.com`
    );

    const myRyokans = await axios.post(
      `http://localhost:3000/api/my/myReservations`,
      { reserveId: reserveIds.data }
    );

    expect(myRyokans.data).toHaveLength(2);
  } catch (err: any) {
    console.log(err);
    console.log(err.error_message);
  }
});

export {};
