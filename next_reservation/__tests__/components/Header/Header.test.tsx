import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import Header from '../../../components/Header/Header';
import {
  mockStoreValue,
  useDispatchMock,
  useSelectorMock,
} from '../../../__mocks__/auth/authMocks';
import { useMockStore } from '../../../store';

const store = useMockStore;

beforeEach(() => {
  const dispatchMock = useDispatchMock;
  store.dispatch = dispatchMock;
  useSelectorMock.mockImplementation((selector) =>
    selector({ user: mockStoreValue })
  );
});

test('헤더 렌더링 | 버튼 확인', () => {
  const header = render(
    <Provider store={store}>
      <Header />
    </Provider>
  );
  expect(header.getByText('로그인')).toBeInstanceOf(HTMLButtonElement);
  expect(header.getByText('회원가입')).toBeInstanceOf(HTMLButtonElement);
});
test('헤더 렌더링 | 회원가입 버튼 클릭 이벤트 발생 -> 모달창 렌더링', () => {
  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );
  const signUpBtn = screen.getByText('회원가입');
  expect(signUpBtn).toBeDefined();
  userEvent.click(signUpBtn);
});
test('헤더 렌더링 | 로그인 버튼 클릭 이벤트 발생 -> 모달창 렌더링', () => {
  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );
  const signinBtn = screen.getByText('로그인');
  expect(signinBtn).toBeDefined();
  userEvent.click(signinBtn);
});
