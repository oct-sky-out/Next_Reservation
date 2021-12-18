import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { firestroeAdmin } from 'firebaseAdmin';

const register = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    res.status(400).send(err);
  },
  onNoMatch: (_req, res, _next) => {
    res.send(404);
  },
});

register.post(async (req, res) => {
  const { email, registerData } = req.body;
  console.log(email, registerData);
  await firestroeAdmin()
    .doc(email)
    .collection('RegisterRooms')
    .add(registerData);
});

export default register;
