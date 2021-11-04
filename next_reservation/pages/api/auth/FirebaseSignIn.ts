import type { NextApiRequest, NextApiResponse } from 'next';
import { signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import {
  setDoc,
  doc,
  getDoc,
  DocumentData,
  Timestamp,
} from 'firebase/firestore';
import { auth } from '../../../firebaseClient';
import { USER_COLLECTION } from '../../../fireStoreDB';

export interface IFirebaseSignInResult {
  type: string;
  email: string;
  name: string;
  userPicture: object;
  brithDay: number;
}

export interface IFirebaseSignInError {
  type: string;
  code: string;
  message: string;
}

export default async function FirebaseSignIn<
  IFirebaseSignInResult,
  IFirebaseSignInError
>(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const loginRes = await signInWithEmailAndPassword(auth, email, password);
      const token = await loginRes.user.getIdToken();
      const expires = new Date(Date.now() + 60 * 60 * 24 * 1000 * 3);
      const document = doc(USER_COLLECTION, email);

      let documentData: DocumentData | undefined = {
        name: '',
        userPicture: '',
        brithDay: Timestamp.fromDate(new Date(Date.now())),
        isLogged: false,
        email: '',
      };
      documentData = (await getDoc(document)).data();
      if (documentData) {
        const { email, name, brithDay, userPicture } = documentData;
        setDoc(doc(USER_COLLECTION, email), {
          ...documentData,
          brithDay: new Date(brithDay.seconds * 1000),
          isLogged: true,
        });
        res
          .status(200)
          .setHeader(
            'Set-Cookie',
            `access_token=${token};path=/;expires=${expires.toUTCString()};httponly`
          )
          .json({
            type: 'success',
            email,
            name,
            brithDay: brithDay.seconds,
            userPicture,
          });
      }
      if (!documentData) {
        res.status(404).send({
          type: 'error',
          code: '유저없음',
          message: '유저를 찾을 수 없습니다.',
        });
      }
    } catch (err: AuthError | any) {
      res.status(400).send({
        type: 'error',
        code: err.code,
        message: err.message,
      });
    }
  }
  res.statusCode = 503;
  res.end();
}
