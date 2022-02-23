/**
 * @jest-environment node
 */

import axios from 'axios';

test('예약 정상 처리 완료시 예약성공 문구를 받아야함.', async () => {
  try {
    const { data } = await axios.post(`http://localhost:3000/api/reserve`, {
      email: 'abc@naver.com',
      reserveId: 'asdasd',
    });
    expect(data).toBe('예약성공');
  } catch (err: any) {
    console.log(err);
    console.log(err.error_message);
  }
});

export {};
