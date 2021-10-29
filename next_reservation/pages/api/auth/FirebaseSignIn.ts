import type { NextApiRequest, NextApiResponse } from 'next';
import { signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { auth } from '../../../firebase.config';

export interface IFirebaseSignInResult {
  type: 'success';
  email: string;
  provider: string;
}

export interface IFirebaseSignInError {
  type: 'error';
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
      res.statusCode = 200;
      res.send({
        type: 'success' as const,
        email,
        token: await loginRes.user.getIdToken(true),
      });
    } catch (err: AuthError | any) {
      res.statusCode = 403;
      res.send({
        type: 'error' as const,
        code: err.code,
        message: err.message,
      });
    }
  }
  res.statusCode = 503;
  res.end();
}
