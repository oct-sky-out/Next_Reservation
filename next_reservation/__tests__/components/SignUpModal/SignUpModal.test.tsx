import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isDisabled, getValue } from '@testing-library/user-event/dist/utils';
import '@testing-library/jest-dom/extend-expect';
import SignUp from '../../../components/Auth/SignUpModal';
import CommonInputStyle from 'styles/common/Input';

describe('<Header/>', () => {
  test('회원가입 모달 렌더링', () => {
    render(<SignUp />);
  });
  test('회원가입 모달 렌더링 | input태그에 입력 후 체크 | 모두 입력 시 버튼 활성화', async () => {
    render(<SignUp />);

    const emailField = await screen.getByTestId('email');
    const nameField = await screen.getByTestId('name');
    const pwd1Field = await screen.getByTestId('pwd1');
    const pwd2Field = await screen.getByTestId('pwd2');
    const submitBtn = await screen.getByTestId('submit');

    expect(isDisabled(submitBtn)).toEqual(true);

    userEvent.type(emailField, 'abc@goooogle.com');
    userEvent.type(nameField, 'abc');
    userEvent.type(pwd1Field, 'abc1234');
    userEvent.type(pwd2Field, 'abc1234');

    expect(emailField.value).toEqual('abc@goooogle.com');
    expect(nameField.value).toEqual('abc');
    expect(pwd1Field.value).toEqual('abc1234');
    expect(pwd2Field.value).toEqual('abc1234');

    expect(isDisabled(submitBtn)).toEqual(false);
  });
});
