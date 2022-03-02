import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { firestroeAdmin } from 'firebaseAdmin';

const remove = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    res.status(400).send(err);
  },
  onNoMatch: (_req, res, _next) => {
    res.send(404);
  },
});

remove.delete(async (req, res) => {
  const { ryokanId } = req.query;

  if (!ryokanId) res.status(400).end();
  const writeTime = await (
    await firestroeAdmin()
      .collection('RegisterRyokans')
      .doc(ryokanId as string)
      .delete()
  ).writeTime.toDate();

  res.status(200).send({ status: true, writeTime });
});

export default remove;
