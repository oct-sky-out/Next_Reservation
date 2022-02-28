/**
 * @jest-environment node
 */

import axios from 'axios';

test('료칸 상세정보 조회시 료칸 1개의 정보가 나와야함.', async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/ryokan/detail?title=${encodeURI(
        '절 바로 옆에서 료칸을 즐겨요'
      )}`
    );
    expect(data).toBe('조회완료');
  } catch (err: any) {
    console.log(err);
    console.log(err.error_message);
  }
});
