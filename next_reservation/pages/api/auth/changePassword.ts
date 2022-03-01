import cookieParseToArray from '@/lib/utils/cookieParseToArray';
import { firebaseAdminAuth, verifyIdToken } from 'firebaseAdmin';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

const changePassword = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    res.status(400).send(err);
  },
  onNoMatch: (_req, res, _next) => {
    res.send(404);
  },
});

changePassword.post(async (req, res) => {
  const { password } = req.body;

  if (!password) res.status(400).end();
  if (!req.headers.cookie) res.status(400).end();
  const cookies = cookieParseToArray(req.headers.cookie);
  let accessToken = '';

  cookies.forEach((cookie) => {
    if (cookie.key === 'access_token') accessToken = cookie.value;
  });

  let resultEmail = '';

  const user = await verifyIdToken(accessToken);
  if (!user) res.status(400).send('접근불가능');
  if (user)
    resultEmail = await (
      await firebaseAdminAuth().updateUser(user.uid, { password })
    ).email!;

  res.status(200).send(resultEmail);
});

export default changePassword;
