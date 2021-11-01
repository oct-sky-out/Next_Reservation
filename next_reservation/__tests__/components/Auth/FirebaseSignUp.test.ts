/**
 * @jest-environment node
 */

import axios from 'axios';
import { AuthErrorCodes } from 'firebase/auth';
import DefaultUserPicture from '../../../public/static/user/default_user_picture.png';

test('Firebase 회원가입 테스트', async () => {
  try {
    const result = await axios.post(
      'http://localhost:3000/api/auth/FirebaseSignUp',
      {
        email: 'abc123@google.com',
        name: 'James',
        year: '1990',
        month: '11',
        day: '12',
        password: '1234567',
        isLogged: true,
        userPicture: DefaultUserPicture,
      }
    );
    if (result.data.type === 'success')
      expect(result.data.email).toMatch('abc123@google.com');
  } catch (err: any) {
    expect(err.response.data.message).toMatch(AuthErrorCodes.EMAIL_EXISTS);
  }
});
