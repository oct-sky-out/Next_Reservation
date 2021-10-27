import { createUser } from '../../../components/Auth/FirebaseSignUp';

test('Firebase 회원가입 테스트', async () => {
  const result = await createUser(
    'abc123@example.com',
    'James',
    '1990',
    '11',
    '10',
    '123456787'
  );
  console.log(result);

  expect(result.type).not.toMatch('error');
});

export {};
