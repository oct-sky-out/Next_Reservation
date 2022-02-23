import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { firestroeAdmin } from 'firebaseAdmin';

const reserve = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    res.status(400).send(err);
  },
  onNoMatch: (_req, res, _next) => {
    res.send(404);
  },
});

reserve.post(async (req, res) => {
  const {
    email,
    reserveId,
    adultCount,
    childrenCount,
    infantsCount,
    checkIn,
    checkOut,
  } = req.body;

  if (!reserveId || !email) res.status(400).end();

  const userReservataionData = await (
    await firestroeAdmin().collection('reservationList').doc(email).get()
  ).data();

  const reserveData = {
    reserveId,
    adultCount,
    childrenCount,
    infantsCount,
    checkIn,
    checkOut,
  };

  console.log(reserveData);
  if (userReservataionData)
    await firestroeAdmin()
      .collection('reservationList')
      .doc(email)
      .update({
        reservations: [
          ...userReservataionData.reservations,
          { ...reserveData },
        ],
      });

  if (!userReservataionData)
    await firestroeAdmin()
      .collection('reservationList')
      .doc(email)
      .create({ reserveUser: email, reservations: [{ ...reserveData }] });

  res.status(200).send('예약성공');
});

export default reserve;
