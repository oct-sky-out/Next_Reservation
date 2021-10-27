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

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, name, year, month, day, password } = req.body;
    const brithDay = new Date(`${year}.${month}.${day}`);
    const hashPassword = await hash(password, 10);

    return createUserWithEmailAndPassword(auth, email, hashPassword)
      .then(async (firebaseResponse) => {
        const docID = await addDoc(USER_COLLECTION, {
          email,
          name,
          brithDay,
        }).catch((error: FirestoreError) => {
          return res.send({
            type: 'error' as const,
            code: error.code,
            message: error.message,
          });
        });
        res.status(200);
        return res.send({
          type: 'complete' as const,
          email: firebaseResponse.user.email,
          docID: docID ? docID.id : '',
        });
      })
      .catch((error: AuthError) => {
        return res.send({
          type: 'error' as const,
          code: error.code,
          message: error.message,
        });
      });
  }
}
