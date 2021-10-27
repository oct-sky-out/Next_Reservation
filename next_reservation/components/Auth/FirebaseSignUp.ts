import { createUserWithEmailAndPassword, AuthError } from 'firebase/auth';
import { getDoc, addDoc, collection, FirestoreError } from 'firebase/firestore';
import { hash } from 'bcryptjs';
import { auth, firestore } from '../../firebase.config';

export interface IFirebaseSignUpResult {
  type: string;
  email: string;
  provider: string;
}

export interface IFirebaseSignUpError {
  type: string;
  errorCode: any;
  errorMessage: any;
}
const USER_COLLECTION = collection(firestore, 'NEXT_USER');

export const createUser = async (
  email: string,
  name: string,
  year: string,
  month: string,
  day: string,
  password: string
) => {
  try {
    const brithDay = new Date(`${year}.${month}.${day}`);
    password = await hash(password, 10);

    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const docID = await addDoc(USER_COLLECTION, {
          email,
          name,
          brithDay,
        }).catch((error: FirestoreError) => {
          throw { code: error.code, message: error.message };
        });

        return {
          type: 'complete',
          email: res.user.email,
          docID: docID.id,
        };
      })
      .catch((error: AuthError) => {
        throw { code: error.code, message: error.message };
      });
  } catch (error: FirestoreError | AuthError | any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { type: 'error', errorCode, errorMessage };
  }
};
