import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { firestroeAdmin } from 'firebaseAdmin';

const reservations = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    res.status(400).send(err);
  },
  onNoMatch: (_req, res, _next) => {
    res.send(404);
  },
});

reservations.post(async (req, res) => {
  const { reserveId } = req.body;

  if (!reserveId) res.status(400).end();
  let ryokans: unknown[] = []; // type => IRyokanType[]

  for (const id of reserveId as string[]) {
    await (
      await firestroeAdmin().collection('RegisterRyokans').get()
    ).forEach(
      (document) => document.id === id && ryokans.push(document.data())
    );
  }

  res.status(200).send(ryokans);
});

export default reservations;
