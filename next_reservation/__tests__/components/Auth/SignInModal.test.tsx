import { render, screen } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import * as customSelecor from '../../../store/index';
import userEvent from '@testing-library/user-event';
import { isDisabled, getValue } from '@testing-library/user-event/dist/utils';
import '@testing-library/jest-dom/extend-expect';
import SignInModal from '../../../components/Auth/SignInModal';

let useSelectorMock = jest.spyOn(customSelecor, 'useSelector');
let useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

const mockStoreValue = {
  loginForm: {
    email: '',
    password: '',
  },
  data: {
    type: '',
    email: '',
    isLogged: false,
  },
  error: {
    type: '',
    code: '',
    message: '',
  },
};

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
