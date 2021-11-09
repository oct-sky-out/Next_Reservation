import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import '@testing-library/jest-dom/extend-expect';
import SignUp from '../../../components/Auth/SignUpModal';
import { Provider } from 'react-redux';
import { useMockStore } from '../../../store/index';
import { useDispatchMock } from '../../../__mocks__/redux/reduxStateMocks';

const store = useMockStore;

beforeEach(() => {
  const dispatchMock = useDispatchMock;
  store.dispatch = dispatchMock;
});

test('회원가입 모달 렌더링', () => {
  useDispatchMock.mockReturnValue(jest.fn());

  render(
    <Provider store={store}>
      <SignUp closeModal={jest.fn} />
    </Provider>
  );
});

test('회원가입 모달 렌더링 | input태그에 입력 후 체크 | 모두 입력 시 버튼 활성화', async () => {
  render(
    <Provider store={store}>
      <SignUp closeModal={jest.fn} />
    </Provider>
  );

  const emailField = await screen.getByTestId<HTMLInputElement>('email');
  const nameField = await screen.getByTestId<HTMLInputElement>('name');
  const pwd1Field = await screen.getByTestId<HTMLInputElement>('pwd1');
  const pwd2Field = await screen.getByTestId<HTMLInputElement>('pwd2');
  const brithYearSelector = await screen.getByTestId<HTMLSelectElement>(
    'brithYear'
  );
  const brithMonthSelector = await screen.getByTestId<HTMLSelectElement>(
    'brithMonth'
  );
  const brithDaySelector = await screen.getByTestId<HTMLSelectElement>(
    'brithDay'
  );
  const submitBtn = await screen.getByTestId<HTMLButtonElement>('submit');

  expect(isDisabled(submitBtn)).toEqual(true);

  userEvent.type(emailField, 'abc@goooogle.com');
  userEvent.type(nameField, 'abc');
  userEvent.type(pwd1Field, 'password123#');
  userEvent.type(pwd2Field, 'password123#');

  expect(emailField.value).toEqual('abc@goooogle.com');
  expect(nameField.value).toEqual('abc');
  expect(pwd1Field.value).toEqual('password123#');
  expect(pwd2Field.value).toEqual('password123#');
  expect(brithYearSelector.value).toEqual('1900');
  expect(brithMonthSelector.value).toEqual('1');
  expect(brithDaySelector.value).toEqual('1');

  expect(isDisabled(submitBtn)).toEqual(false);
});

test('회원가입 모달 렌더링 | 비밀번호 입력 후 비밀번호 시각 활성화 비활성화 테스트', async () => {
  render(
    <Provider store={store}>
      <SignUp closeModal={jest.fn} />
    </Provider>
  );

  const pwd1Field = await screen.getByTestId<HTMLInputElement>('pwd1');
  const pwd2Field = await screen.getByTestId<HTMLInputElement>('pwd2');
  const changeTypeTexts = await screen.getAllByTestId('changeTypeText');

  expect(pwd1Field.type).toEqual('password');
  expect(pwd2Field.type).toEqual('password');

  changeTypeTexts.forEach((AiFillEye) => {
    userEvent.click(AiFillEye);
  });

  const changeTypePassword = await screen.getAllByTestId('changeTypePassword');

  expect(pwd1Field.type).toEqual('text');
  expect(pwd2Field.type).toEqual('text');

  changeTypePassword.forEach((AiFillEyeInvisible) => {
    userEvent.click(AiFillEyeInvisible);
  });

  expect(pwd1Field.type).toEqual('password');
  expect(pwd2Field.type).toEqual('password');
});
