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

const store = useMockStore;

beforeEach(() => {
  const dispatchMock = useDispatchMock;
  store.dispatch = dispatchMock;
  useSelectorMock.mockImplementation((selector) =>
    selector({
      user: mockStoreValue,
    })
  );
});

afterEach(() => {
  useSelectorMock.mockClear();
});

test('SignInModal 화면 테스트 | email, password 입력폼 테스트', async () => {
  render(
    <Provider store={store}>
      <SignInModal closeModal={jest.fn} />
    </Provider>
  );
  const emailInput = await screen.findByTestId<HTMLInputElement>('email');
  const passwordInput = await screen.findByTestId<HTMLInputElement>('pwd');
  expect(emailInput.type).toEqual('email');
  expect(passwordInput.type).toEqual('password');
});

test('SignInModal 화면 테스트 | password 입력폼 타입변환 테스트', async () => {
  render(
    <Provider store={store}>
      <SignInModal closeModal={jest.fn} />
    </Provider>
  );

  const passwordInput = await screen.findByTestId<HTMLInputElement>('pwd');
  expect(passwordInput.type).toEqual('password');
});
test('로그인 후 토큰 확인 -> 로그아웃 후 토큰 삭제 확인', async () => {
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
