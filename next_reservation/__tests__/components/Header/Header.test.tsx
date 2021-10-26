import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '../../../components/Header/Header';

describe('<Header/>', () => {
  test('헤더 렌더링 | 버튼 확인', () => {
    const header = render(<Header />);
    expect(header.getByText('로그인')).toBeInstanceOf(HTMLButtonElement);
    expect(header.getByText('회원가입')).toBeInstanceOf(HTMLButtonElement);
  });
  test('헤더 렌더링 | 회원가입 버튼 클릭 이벤트 발생 -> 모달창 렌더링', () => {
    const header = render(<Header />);
    const signUpBtn = header.getByText('회원가입');
    fireEvent.click(signUpBtn);

    expect(header.queryAllByText('가입')).not.toBeNull();
  });
});
