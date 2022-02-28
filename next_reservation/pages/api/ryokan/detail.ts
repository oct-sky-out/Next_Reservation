import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { firestroeAdmin } from 'firebaseAdmin';
import { ryokanInitialData } from '@/store/registerRyokan';
import { isEqual } from 'lodash';

const detail = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    res.status(400).send(err);
  },
  onNoMatch: (_req, res, _next) => {
    res.send(404);
  },
});

detail.get(async (req, res) => {
  const { title } = req.query;
  console.log(title);

  if (!title) res.status(400).end();
  let ryokanResult = null;
  await (
    await firestroeAdmin().collection('RegisterRyokans').get()
  ).forEach(
    (ryokan) => ryokan.data().title === title && (ryokanResult = ryokan.data())
  );
  res.status(200).send(ryokanResult);
});

export default detail;
