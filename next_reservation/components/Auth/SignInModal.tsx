import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../store/index';
import { userSignInActions } from '../../store/user/userSignIn';
import usePasswordType from '../hooks/useTogglePasswordType';
import { AuthErrorCodes } from 'firebase/auth';
import { FiMail } from 'react-icons/fi';
import Input from '../common/Input';
import SignInAndUpModal from '../../styles/components/Auth/SignInAndUpModal';
import YasumiTxt from '../../public/static/yasumi/yasumi_txt.svg';
import Swal from 'sweetalert2';

interface IProps {
  closeModal: () => void;
}

type signInFormProp = 'email' | 'password';

const SignInModal: React.FC<IProps> = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { data, error, logged } = useSelector((store) => {
    return {
      data: store.user.data,
      error: store.user.error,
      logged: store.user.logged,
    };
  });
  useEffect(() => {
    if (data.type === 'success' && logged) {
      return closeModal();
    }
    if (error.type === 'error') {
      if (
        error.code === AuthErrorCodes.INVALID_PASSWORD ||
        error.code === AuthErrorCodes.USER_DELETED
      ) {
        Swal.fire({
          icon: 'error',
          title: '이메일, 비밀번호 확인.',
          text: '이메일 혹은 비밀번호를 확인해주세요!',
          timer: 3000,
        }).then(() => {
          dispatch(
            userSignInActions.userSignInFailure({
              type: '',
              code: '',
              message: '',
            })
          );
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '예상치 못한 에러',
          text: `${error.message}`,
          timer: 3000,
        });
      }
    }
  }, [dispatch, data, error, logged]);

  const [signInForm, setSignInform] = useState({ email: '', password: '' });
  const { getCheckState, isShowing } = usePasswordType();
  const changedSignInForm = useCallback(
    (propName: signInFormProp, e: React.ChangeEvent<HTMLInputElement>) => {
      setSignInform({ ...signInForm, [propName]: e.target.value });
    },
    [signInForm]
  );
  const onSignIn = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(
        userSignInActions.userSignIn({
          email: signInForm.email,
          password: signInForm.password,
        })
      );
    },
    [signInForm]
  );

  return (
    <SignInAndUpModal signInOrUp="in">
      <div className="sign-in">
        <div className="sign-in-wrapper shadow-xl">
          <YasumiTxt width="300" className="yasumi-logo-txt" />
          <form onSubmit={onSignIn}>
            <div className="mb-3">
              <label htmlFor="email-input" className="form-label">
                이메일 주소
              </label>
              <Input
                data-testid="email"
                type="email"
                className="form-control"
                id="email-input"
                placeholder="이메일을 입력해주세요."
                icon={<FiMail />}
                value={signInForm.email}
                onChange={(e) => changedSignInForm('email', e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                비밀번호
              </label>
              <Input
                data-testid="pwd"
                type={getCheckState().passwordField}
                id="check-password"
                placeholder="비밀번호를 입력해주세요."
                icon={isShowing(getCheckState().passwordField, 'PWD_FIELD')}
                value={signInForm.password}
                onChange={(e) => changedSignInForm('password', e)}
              />
            </div>
            <button
              type="submit"
              data-testid="submit"
              className="btn submit-btn"
              disabled={!(signInForm.email && signInForm.password)}
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    </SignInAndUpModal>
  );
};

export default SignInModal;
