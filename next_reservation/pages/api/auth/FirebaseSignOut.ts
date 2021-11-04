import type { NextApiRequest, NextApiResponse } from 'next';
import { signOut, getAuth, AuthError } from 'firebase/auth';
import { addDoc, collection, FirestoreError } from 'firebase/firestore';
import { auth, firestore } from '../../../firebaseClient';

export default async function FirebaseSignOut(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method);
  if (req.method === 'delete') {
    try {
      await signOut(getAuth());
      res
        .status(204)
        .setHeader(
          'Set-Cookie',
          `access_token=;path=/;expires=1900-01-01T00:00:00Z;httponly`
        )
        .end();
    } catch (err) {
      res.send(err);
    }
  }
  res.status(405).end();
}
