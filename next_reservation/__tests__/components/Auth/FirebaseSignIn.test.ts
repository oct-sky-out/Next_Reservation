/**
 * @jest-environment node
 */

import axios from 'axios';
import { AuthErrorCodes } from 'firebase/auth';
import requestListener from '../requestListener.util';
import FirebaseSignIn from '../../../pages/api/auth/FirebaseSignIn';

test('Firebase 로그인 테스트', async () => {
  const res = await axios.post(
    'http://localhost:3000/api/auth/FirebaseSignIn',
    {
      email: 'abc123@google.com',
      password: '123456',
    }
  );

  if (res.data.type === 'success') {
    expect(res.data.email).toBe('abc123@google.com');
  } else {
    expect(res.data.message).toMatch(AuthErrorCodes.INVALID_PASSWORD);
  }
});
