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
    console.log(data.city);
    expect(data.contry).toEqual('대한민국');
    expect(data.city).toEqual('서울특별시');
    expect(data.district).toEqual('영등포구');
    expect(data.streetAddress).toEqual('여의도동 １');
    expect(data.latitude).toEqual(latitude);
    expect(data.longitude).toEqual(longitude);
  } catch (err: any | geocodingError) {
    console.log(err);
    console.log(err.error_message);
  }
});
