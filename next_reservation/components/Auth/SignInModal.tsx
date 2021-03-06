import { useRouter } from 'next/router';
import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { userSignInAndUpActions } from '@/store/userSignInAndUp';
import { loadingAction } from '@/store/lodaing';
import { AuthErrorCodes } from 'firebase/auth';
import { FiMail } from 'react-icons/fi';
import nookies from 'nookies';
import Swal from 'sweetalert2';
import Loader from 'react-loader-spinner';
import Input from '../common/Input';
import usePasswordType from '../hooks/useTogglePasswordType';
import SignInAndUpModal from '@/styles/components/Auth/SignInAndUpModal';
import YasumiTxt from '../../public/static/yasumi/yasumi_txt.svg';

interface IProps {
  closeModal?: () => void;
}

type signInFormProp = 'email' | 'password';

const SignInModal: React.FC<IProps> = ({ closeModal }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, error, logged, loading } = useSelector((store) => {
    return {
      data: store.user.data,
      error: store.user.error,
      logged: store.user.logged,
      loading: store.loading,
    };
  });

  const [signInForm, setSignInform] = useState({ email: '', password: '' });
  const { getCheckState, isShowing } = usePasswordType();

  useEffect(() => {
    try {
      if (data.type === 'success' && logged) {
        dispatch(loadingAction.setLoading(false));
        if (data.token) {
          nookies.set(null, 'access_token', data.token, {
            path: '/',
            maxAge: 60 * 60,
            secure: true,
          });
          if (closeModal) return closeModal();
          router.push('/');
        }
      }
      if (error.type === 'error') {
        if (
          error.code === AuthErrorCodes.INVALID_PASSWORD ||
          error.code === AuthErrorCodes.USER_DELETED
        ) {
          dispatch(loadingAction.setLoading(false));
          Swal.fire({
            icon: 'error',
            title: '이메일, 비밀번호 확인.',
            text: '이메일 혹은 비밀번호를 확인해주세요!',
            timer: 3000,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: '에러',
            text: `${error.message}`,
          });
        }
        dispatch(
          userSignInAndUpActions.userSignInOrFailure({
            type: '',
            code: '',
            message: '',
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(loadingAction.setLoading(false));
    }
  }, [data, error, logged]);

  const changedSignInForm = useCallback(
    (propName: signInFormProp, e: React.ChangeEvent<HTMLInputElement>) => {
      setSignInform({ ...signInForm, [propName]: e.target.value });
    },
    [signInForm]
  );
  const onSignIn = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(loadingAction.setLoading(true));
      dispatch(
        userSignInAndUpActions.userSignIn({
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
                id="password-input"
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
              <div className=" w-full h-full flex justify-center items-center ">
                {loading ? (
                  <Loader type="Oval" color="#fff" height="40" width="40" />
                ) : (
                  '로그인'
                )}
              </div>
            </button>
          </form>
        </div>
      </div>
    </SignInAndUpModal>
  );
};

export default SignInModal;
