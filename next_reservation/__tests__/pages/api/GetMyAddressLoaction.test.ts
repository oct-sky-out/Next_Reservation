/**
 * @jest-environment node
 */

import axios from 'axios';

test('내위치 주소 조회하기 테스트', async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/maps/addressLocation`,
      { params: { address: '대한민국 서울특별시 영등포구 여의도동' } }
    );
    expect(data.results.formatted_address).toEqual(
      '대한민국 서울특별시 영등포구 여의도동'
    );
  } catch (err: any) {
    console.log(err);
    console.log(err.error_message);
  }
});
