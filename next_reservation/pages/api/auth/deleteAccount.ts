import cookieParseToArray from '@/lib/utils/cookieParseToArray';
import {
  firebaseAdminAuth,
  verifyIdToken,
  firestroeAdmin,
} from 'firebaseAdmin';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

const deleteAccount = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    res.status(400).send(err);
  },
  onNoMatch: (_req, res, _next) => {
    res.send(404);
  },
});

deleteAccount.delete(async (req, res) => {
  if (!req.headers.cookie) res.status(400).end();
  const cookies = cookieParseToArray(req.headers.cookie);
  let accessToken = '';

  cookies.forEach((cookie) => {
    if (cookie.key === 'access_token') accessToken = cookie.value;
  });

  const user = await verifyIdToken(accessToken);
  const registeredRyokans: string[] = [];

  if (!user) res.status(400).send('로그인 만료');
  if (user) {
    if (user.email) {
      await firestroeAdmin().collection('NEXT_USERS').doc(user.email).delete();
      await firestroeAdmin()
        .collection('reservationList')
        .doc(user.email)
        .delete();
      (await firestroeAdmin().collection('RegisterRyokans').get()).forEach(
        (document) => {
          document.data().ryokanManager === user.email &&
            registeredRyokans.push(document.id);
        }
      );
    }
    registeredRyokans.forEach(
      async (id) =>
        await firestroeAdmin().collection('RegisterRyokans').doc(id).delete()
    );
    await firebaseAdminAuth().deleteUser(user.uid);
  }

  res.status(200).send('삭제완료');
});

export default deleteAccount;
