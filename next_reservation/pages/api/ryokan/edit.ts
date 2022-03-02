import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { firestroeAdmin } from 'firebaseAdmin';

const edit = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    res.status(400).send(err);
  },
  onNoMatch: (_req, res, _next) => {
    res.send(404);
  },
});

edit.put(async (req, res) => {
  const { ryokan, ryokanId } = req.body;
  if (!(ryokan && ryokanId)) res.status(400).end();

  const updateTime = await (
    await firestroeAdmin()
      .collection('RegisterRyokans')
      .doc(ryokanId)
      .update(ryokan)
  ).writeTime.toDate();

  res.status(200).send({ status: true, updateTime });
});

export default edit;
