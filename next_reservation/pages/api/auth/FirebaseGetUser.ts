import { NextApiRequest, NextApiResponse } from 'next';
import { getDoc, doc } from 'firebase/firestore';
import { verifyIdToken } from 'firebaseAdmin';
import { USER_COLLECTION } from 'fireStoreDB';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        res.status(400).end();
      }
      if (accessToken) {
        const token = accessToken.split(' ')[1];
        const user = await verifyIdToken(token);

        if (user) {
          const userData = (
            await getDoc(doc(USER_COLLECTION, user.email))
          ).data();

          if (!userData) {
            res.status(400).send('유저 정보가 존재하지 않습니다.');
          }
          if (userData) {
            res.status(200).send({
              ...userData,
              brithDay: new Date(userData.brithDay.seconds * 1000),
            });
          }
        }
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
  res.status(405).end();
}
