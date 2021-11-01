import type { NextApiRequest, NextApiResponse } from 'next';
import { signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { auth } from '../../../firebase.config';

export interface IFirebaseSignInResult {
  type: string;
  email: string;
  isLogged: boolean;
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
      res
        .status(200)
        .setHeader(
          'Set-Cookie',
          `access_token=${token};path=/;expires=${expires.toUTCString()};httponly`
        )
        .json({
          type: 'success',
          email,
        });
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
