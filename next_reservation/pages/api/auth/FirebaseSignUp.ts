import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createUserWithEmailAndPassword,
  AuthError,
  sendEmailVerification,
  signOut,
} from 'firebase/auth';
import { setDoc, doc, FirestoreError, Timestamp } from 'firebase/firestore';
import { auth } from '../../../firebaseClient';
import { USER_COLLECTION } from '../../../fireStoreDB';

export interface IFirebaseSignUpResult {
  type: string;
  email: string;
}

export interface IFirebaseSignUpError {
  type: string;
  code: any;
  message: any;
}

export default async function FirebaseSignUp(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, name, year, month, day, password, userPicture, isLogged } =
      req.body;
    const brithDay = new Date(`${year}.${month}.${day}`);

    try {
      const createUserRes = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(createUserRes.user);

      await setDoc(doc(USER_COLLECTION, email), {
        email,
        name,
        brithDay: Timestamp.fromDate(brithDay),
        isLogged,
        userPicture,
      });

      res.status(200).json({
        type: 'success',
        email: createUserRes.user.email,
      });
    } catch (error: AuthError | FirestoreError | any) {
      res.status(400).send({
        type: 'error',
        code: error.code,
        message: error.message,
      });
    }
  }
  res.statusCode = 405;
  res.end();
}
