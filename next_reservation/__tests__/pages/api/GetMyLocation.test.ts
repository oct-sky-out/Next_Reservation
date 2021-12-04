/**
 * @jest-environment node
 */

import axios from 'axios';
import { AuthErrorCodes } from 'firebase/auth';

type addressComponentsType = {
  long_name: string;
  short_name: string;
  types: string[];
};
type geometryType = {
  location: {
    lat: number;
    lng: number;
  };
  location_type: number;
  viewport: {
    northeast: {
      lat: number;
      lng: number;
    };
    southwest: {
      lat: number;
      lng: number;
    };
  };
};
type plusCodeType = {
  compound_code: string;
  global_code: string;
};

type geocodingResult = {
  plus_code: plusCodeType;
  results: [
    {
      address_components: addressComponentsType[];
      formatted_address: string;
      geometry: geometryType;
      place_id: string;
      plus_code: plusCodeType;
      types: string[];
    }
  ];
  status: string;
};

type geocodingError = {
  error_message: string;
  results: any[];
  status: string;
};

test('Firebase 회원가입 테스트', async () => {
  try {
    const latitude = 37.531129;
    const longitude = 126.917178;
    const { data } = await axios.get<geocodingResult>(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=AIzaSyAsYSdE9aPX1pNCv58VF0sHj_gNdqyB8Mc`
    );
    if (data.results) {
      console.log(data.results[0].formatted_address);
      expect(data.results[0].formatted_address).toEqual(
        '대한민국 서울특별시 영등포구 여의도동 1'
      );
    }
  } catch (err: any | geocodingError) {
    console.log(err.error_message);
  }
});
