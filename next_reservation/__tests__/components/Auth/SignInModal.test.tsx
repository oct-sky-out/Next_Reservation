import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useMockStore } from '../../../store/index';
import '@testing-library/jest-dom/extend-expect';
import SignInModal from '../../../components/Auth/SignInModal';
import {
  mockStoreValue,
  useDispatchMock,
  useSelectorMock,
} from '../../../__mocks__/auth/authMocks';
import userEvent from '@testing-library/user-event';

test('SignInModal 화면 테스트 | email, password 입력폼 테스트', async () => {
  useSelectorMock.mockReturnValue(mockStoreValue);
  useDispatchMock.mockReturnValue(jest.fn());
  render(<SignInModal closeModal={jest.fn} />);
  const emailInput = await screen.findByTestId<HTMLInputElement>('email');
  const passwordInput = await screen.findByTestId<HTMLInputElement>('pwd');
  expect(emailInput.type).toEqual('email');
  expect(passwordInput.type).toEqual('password');
});

test('SignInModal 화면 테스트 | password 입력폼 타입변환 테스트', async () => {
  useSelectorMock.mockReturnValue(mockStoreValue);
  useDispatchMock.mockReturnValue(jest.fn());
  render(<SignInModal closeModal={jest.fn} />);
  const passwordInput = await screen.findByTestId<HTMLInputElement>('pwd');
  expect(passwordInput.type).toEqual('password');
});

test('로그인 후 로그인 액션이 발생하는가?', async () => {
  // mock data 삽입, store를
  const store = useMockStore;
  const useDispatchMock = jest.fn(store.dispatch);

  store.dispatch = useDispatchMock;
  useSelectorMock.mockReturnValue({
    userSignIn: mockStoreValue,
    userSignUp: { data: { type: '', email: '', isLogged: false } },
  });

  // 렌더링
  render(
    <Provider store={store}>
      <SignInModal closeModal={jest.fn} />
    </Provider>
  );

  const emailField = await screen.findByTestId<HTMLInputElement>('email');
  const passwordField = await screen.findByTestId<HTMLInputElement>('pwd');
  const submitButton = await screen.findByTestId<HTMLButtonElement>('submit');
  userEvent.type(emailField, 'abc123@google.com');
  userEvent.type(passwordField, '1234567');
  userEvent.click(submitButton);

  expect(useDispatchMock.mock.results[0].value.type).toMatch('user/userSignIn');
});
