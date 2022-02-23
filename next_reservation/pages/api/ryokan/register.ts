import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { firestroeAdmin } from 'firebaseAdmin';
import { ryokanInitialData } from '@/store/registerRyokan';
import { isEqual } from 'lodash';

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
  if (isEqual(registerData, ryokanInitialData)) res.status(400).end();
  await firestroeAdmin()
    .collection('RegisterRyokans')
    .doc()
    .create({ ...registerData, ryokanManager: email });
  res.status(200).send('등록성공');
});

export default register;
