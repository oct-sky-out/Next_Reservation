import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { firestroeAdmin } from 'firebaseAdmin';

const myReservations = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    res.status(400).send(err);
  },
  onNoMatch: (_req, res, _next) => {
    res.send(404);
  },
});

myReservations.post(async (req, res) => {
  const { reserveId } = req.body;

  if (!reserveId) res.status(400).end();
  let ryokans: unknown[] = []; // type => IRyokanType[]

  ryokans = await (
    await firestroeAdmin().collection('RegisterRyokans').get()
  ).docs
    .map((ryokanDocument) => {
      for (const id of reserveId as string[])
        if (ryokanDocument.id === id) return ryokanDocument.data();
      return null;
    })
    .filter((ryokan) => ryokan);
  res.status(200).send(ryokans);
});

export default myReservations;
