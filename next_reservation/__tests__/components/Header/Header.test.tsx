import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Header from '../../../components/Header/Header';

describe('<Header/>', () => {
  test('헤더 렌더링 | 버튼 확인', () => {
    const header = render(<Header />);
    expect(header.getByText('로그인')).toBeInstanceOf(HTMLButtonElement);
    expect(header.getByText('회원가입')).toBeInstanceOf(HTMLButtonElement);
  });
  test('헤더 렌더링 | 회원가입 버튼 클릭 이벤트 발생 -> 모달창 렌더링', () => {
    render(<Header />);
    const signUpBtn = screen.getByText('회원가입');
    expect(signUpBtn).toBeDefined();
    userEvent.click(signUpBtn);
  });
});
