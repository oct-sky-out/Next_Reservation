/**
 * @jest-environment node
 */

import axios from 'axios';
import {
  locationApiType,
  geocodingError,
} from '../../../types/apiTyps/maps/location';

test('Firebase 회원가입 테스트', async () => {
  try {
    const latitude = 37.531129;
    const longitude = 126.917178;
    const { data } = await axios.get<locationApiType>(
      `http://localhost:3000/api/maps/location`,
      { params: { latitude, longitude } }
    );
    console.log(data);
    expect(data.address).toEqual('대한민국');
    expect(data.address).toEqual('서울특별시 영등포구 여의도동 １');
    expect(data.latitude).toEqual('37.53113');
    expect(data.longitude).toEqual('126.9171782');
  } catch (err: any | geocodingError) {
    console.log(err);
    console.log(err.error_message);
  }
});
