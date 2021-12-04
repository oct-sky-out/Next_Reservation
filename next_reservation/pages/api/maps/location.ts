import axios from 'lib/api';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  geocodingResult,
  geocodingError,
} from '../../../types/apiTyps/maps/location';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const locationData = [
        'streetAddress',
        'district',
        'city',
        'contry',
        'postCode',
        'latitude',
        'longitude',
      ];
      const { latitude, longitude } = req.query;
      console.log(latitude, longitude);
      if (!latitude || !longitude) {
        res.status(400).send('위치 정보를 확인해주세요.');
      }

      const {
        data: { results },
      } = await axios.get<geocodingResult>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=AIzaSyAsYSdE9aPX1pNCv58VF0sHj_gNdqyB8Mc`
      );
      const { lat, lng } = results[0].geometry.location;

      const sendData = locationData.reduce((sendObj, currentKey, index) => {
        if (currentKey === 'latitude' || currentKey === 'longitude') {
          return currentKey === 'latitude'
            ? Object.assign(sendObj, { [currentKey]: lat })
            : Object.assign(sendObj, { [currentKey]: lng });
        }
        if (currentKey !== 'latitude' && currentKey !== 'longitude') {
          if (index === 0) {
            return Object.assign(sendObj, {
              [currentKey]: `${results[0].address_components[1].long_name.trim()} ${results[0].address_components[0].long_name.trim()}`,
            });
          }

          const ADDRESS_COMPONETS_INDEX = index + 1;
          if (index !== 0) {
            return Object.assign(sendObj, {
              [currentKey]: `${results[0].address_components[
                ADDRESS_COMPONETS_INDEX
              ].long_name.trim()}`,
            });
          }
        }
        return sendObj;
      }, {});
      res.status(200).send(sendData);
    } catch (error: any | geocodingError) {
      res.status(400).send(error.error_message);
    }
  }
  req.statusCode = 200;
};
