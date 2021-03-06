/**
 * @jest-environment node
 */
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import SignInModal from '../../../components/Auth/SignInModal';
import { clientApp } from '../../../firebaseClient';
import { AuthErrorCodes, getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { USER_COLLECTION } from '../../../fireStoreDB';

test('Firebase 로그인 테스트', async () => {
  const res = await axios.post(
    'http://localhost:3000/api/auth/FirebaseSignIn',
    {
      email: 'abc123@google.com',
      password: '1234567',
    }
  );

  if (res.data.type === 'success') {
    expect(res.data.email).toBe('abc123@google.com');
    expect(
      (await getDoc(doc(USER_COLLECTION, res.data.email))).data()
    ).not.toBeUndefined();
  } else {
    expect(res.data.code).toMatch(AuthErrorCodes.INVALID_PASSWORD);
  }
  getAuth(clientApp).signOut();
});
