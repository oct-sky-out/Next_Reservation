import type { NextApiRequest, NextApiResponse } from 'next';
import { createUserWithEmailAndPassword, AuthError } from 'firebase/auth';
import { addDoc, collection, FirestoreError } from 'firebase/firestore';
import { hash } from 'bcryptjs';
import { auth, firestore } from '../../../firebase.config';

export interface IFirebaseSignUpResult {
  type: 'complete';
  email: string;
  provider: string;
}

export interface IFirebaseSignUpError {
  type: 'error';
  code: any;
  message: any;
}

const USER_COLLECTION = collection(firestore, 'NEXT_USER');

export default async function FirebaseSignUp(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, name, year, month, day, password } = req.body;
    const brithDay = new Date(`${year}.${month}.${day}`);
    const hashPassword = await hash(password, 10);
    try {
      const createUserRes = await createUserWithEmailAndPassword(
        auth,
        email,
        hashPassword
      );
      const docID = await addDoc(USER_COLLECTION, {
        email,
        name,
        brithDay,
        isLogged: false,
        userPicture: '',
      });

      res.status(200);
      res.send({
        type: 'success' as const,
        email: createUserRes.user.email,
        docID: docID.id,
      });
    } catch (error: AuthError | FirestoreError | any) {
      if (error.code === 'auth/email-already-in-use') res.statusCode = 409;
      if (error.code !== 'auth/email-already-in-use') res.statusCode = 400;

      res.send({
        type: 'error' as const,
        code: error.code,
        message: error.message,
      });
    }
  }
  res.statusCode = 503;
  res.end();
}
