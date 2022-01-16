import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import axios from 'axios';

const place = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => res.status(400).send(err),
  onNoMatch: (_req, res, _next) => res.status(404).end(),
});

place.get(async (req, res) => {
  const { placeName } = req.query;
  if (!placeName) res.status(400).send({ message: '장소가 없습니다.' });
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/place/queryautocomplete/json`,
    {
      params: {
        key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
        language: 'ko',
        input: placeName as string,
      },
    }
  );
  res.status(200).send(data);
});

export default place;
