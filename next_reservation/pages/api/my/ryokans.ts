import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { verifyIdToken, firestroeAdmin } from 'firebaseAdmin';

const ryokans = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    res.status(400).send(err);
  },
  onNoMatch: (_req, res, _next) => {
    res.send(404);
  },
});

ryokans.get(async (req, res) => {
  if (!req.headers.authorization) res.status(400).send('토큰이 없습니다.');
  if (req.headers.authorization) {
    let ryokans: any[] = [];
    const token = req.headers.authorization?.split(' ')[1];
    const user = await verifyIdToken(token);
    (await firestroeAdmin().collection('RegisterRyokans').get()).forEach(
      (ryokan) =>
        ryokan.data().ryokanManager === user.email! &&
        ryokans.push(ryokan.data())
    );
    res.status(200).send(ryokans);
  }
  res.status(400).send('로그인 만료');
});

export default ryokans;
