/**
 * @jest-environment node
 */

import axios from 'axios';
import http from 'http';
import { AuthErrorCodes } from 'firebase/auth';
import requestListener from '../requestListener.util';
import FirebaseSignUp from '../../../pages/api/auth/FirebaseSignUp';

test('Firebase 회원가입 테스트', async () => {
  const result = await axios.post(
    'http://localhost:3000/api/auth/FirebaseSignUp',
    {
      email: 'abc123@google.com',
      name: 'James',
      year: '1990',
      month: '11',
      day: '12',
      password: '1234567',
    }
  );

  expect(result.data.message).toMatch(AuthErrorCodes.EMAIL_EXISTS);
});
