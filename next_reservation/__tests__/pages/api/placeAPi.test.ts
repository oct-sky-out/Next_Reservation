/**
 * @jest-environment node
 */

import axios from 'axios';

test('장소 이름 검색과 알맞는 데이터 가져오기', async () => {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/maps/place`, {
      params: { placeName: '양산시청' },
    });
    expect(data.predictions[0].description).toBe(
      '대한민국 경상남도 양산시 중앙로 양산시청'
    );
  } catch (err: any) {
    console.log(err);
    console.log(err.error_message);
  }
});
