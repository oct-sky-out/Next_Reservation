import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import axios from 'axios';

const place = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => res.status(405).send(err),
  onNoMatch: (_req, res, _next) => res.status(404).end(),
});

place.get(async (req, res) => {
  const { address } = req.query;
  if (!address) res.status(400).send({ message: '장소가 없습니다.' });
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json`,
    {
      params: {
        address: address as string,
        language: 'ko',
        key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
      },
    }
  );

  const { lat, lng } = data.results[0].geometry.location;

  res.status(200).send({ lat, lng });
});

export default place;
