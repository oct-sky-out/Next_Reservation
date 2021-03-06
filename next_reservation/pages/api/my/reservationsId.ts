import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { firestroeAdmin } from 'firebaseAdmin';
import { reservedRyokanType } from '@/types/apiTyps/my/myReservationsId';

const reservationsId = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    res.status(400).send(err);
  },
  onNoMatch: (_req, res, _next) => {
    res.send(404);
  },
});

reservationsId.get(async (req, res) => {
  const { email } = req.query;

  if (!email) res.status(400).end();
  let myReservations: { reserveIds: reservedRyokanType[] } = {
    reserveIds: [],
  };

  const userEmail = email as string;
  await (
    await firestroeAdmin()
      .collection('reservationList')
      .select('reservations')
      .where('reserveUser', '==', userEmail)
      .get()
  ).forEach((reservations) => {
    myReservations = {
      ...myReservations,
      reserveIds: reservations.data().reservations,
    };
  });
  res.status(200).send(myReservations.reserveIds);
});

export default reservationsId;
