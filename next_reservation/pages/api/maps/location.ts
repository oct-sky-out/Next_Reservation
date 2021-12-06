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
        'address',
        'contry',
        'postCode',
        'latitude',
        'longitude',
      ];

      const { latitude, longitude } = req.query;
      if (!latitude || !longitude) {
        res.status(400).send('위치 정보를 확인해주세요.');
      }

      const {
        data: { results },
      } = await axios.get<geocodingResult>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=${process.env.YASUMI_PUBLIC_GOOGLE_MAP_API_KEY}`
      );
      const { lat, lng } = results[0].geometry.location;
      const contry = results[0].formatted_address.split(' ')[0];
      const postCode =
        results[0].address_components[results[0].address_components.length - 1]
          .long_name;
      const address = results[0].formatted_address
        .split(' ')
        .filter((_addresses, index) => index !== 0)
        .join(' ');
      const sendData = {
        contry,
        address,
        postCode,
        latitude: lat,
        longitude: lng,
      };
      res.status(200).send(sendData);
    } catch (error: any | geocodingError) {
      res.status(400).send(error);
    }
  }
  res.status(405).end();
};
