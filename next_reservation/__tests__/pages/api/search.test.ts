/**
 * @jest-environment node
 */
import axios from 'axios';
import { IRyokanType } from '../../../types/reduxActionTypes/ReduxRegiserRyokanType';

test('검색 api 테스트', async () => {
  const { data } = await axios.get<IRyokanType[]>(
    'http://localhost:3000/api/search',
    {
      params: {
        documentStart: 0,
        latitude: 35.3284661,
        longitude: 129.0928597,
        checkInDate: '2022.01.31',
        checkOutDate: '2022.02.01',
        adultCount: 1,
        childrenCount: 1,
        infantsCount: 0,
        convenienceSpaces: null,
        priceMin: null,
        priceMax: null,
        ryokanType: null,
      },
    }
  );
  expect(data).toHaveLength(1);
});

test('검색 api 테스트 (필터링)', async () => {
  const { data } = await axios.get<IRyokanType[]>(
    'http://localhost:3000/api/search',
    {
      params: {
        documentStart: 0,
        latitude: 35.3284661,
        longitude: 129.0928597,
        checkInDate: '2022.01.31',
        checkOutDate: '2022.02.01',
        adultCount: 1,
        childrenCount: 1,
        infantsCount: 0,
        convenienceSpaces: ['gym'],
        priceMin: 10000,
        priceMax: 100000,
        ryokanType: 'Japanese-Western',
      },
    }
  );
  expect(data).toHaveLength(1);
});
