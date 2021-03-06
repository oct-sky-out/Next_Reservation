/**
 * @jest-environment node
 */
import { getIdToken, signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { verifyIdToken } from '../../../firebaseAdmin';
import cookieParseToArray from '../../../lib/utils/cookieParseToArray';
import { clientApp } from '../../../firebaseClient';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

const tokenMock = jest.fn((token: string) => 'access_token=' + token);

let token = '';

let user: DecodedIdToken | null;

test('(테스트) 임의의 쿠키에 저장된 토큰 조회 후 토큰 분리', async () => {
  const { user } = await signInWithEmailAndPassword(
    getAuth(clientApp),
    'abc123@google.com',
    '1234567'
  );
  token = await getIdToken(user, true);
  expect(token).not.toEqual('');
});

test('(쿠키의)토큰 발행 후 토큰에 저장된 유저 정보 조회', async () => {
  const cookies = cookieParseToArray(tokenMock(token));
  let cookieToken = '';

  cookies.forEach((cookie) => {
    if (cookie.key === 'access_token') return (cookieToken = cookie.value);
  });

  user = await verifyIdToken(cookieToken);
  expect(user.email).toEqual('abc123@google.com');
});
