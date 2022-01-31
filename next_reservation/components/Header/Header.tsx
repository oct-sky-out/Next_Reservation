import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import { useSelector } from '@/store/index';
import HeaderUserProfile from './HeaderUserProfile';
import SignUpModal from '../Auth/SignUpModal';
import SignInModal from '../Auth/SignInModal';
import useModal from '../hooks/useModal';
import Container from '@/styles/components/Header/Header';
import YasumiCol from '../../public/static/yasumi/yasumi_col.svg';
import YasumiTxt from '../../public/static/yasumi/yasumi_txt.svg';

const Header: React.FC = () => {
  const { modalOpenState, isLogged } = useSelector((selector) => ({
    modalOpenState: selector.modalState.modalState,
    isLogged: selector.user.logged,
  }));

  const { openModal, ModalPotal, closeModal } = useModal();
  const [signUpAndInModal, setSignUpAndInModal] = useState({
    signUp: false,
    signIn: false,
  });

  const onSignUpClick = useCallback(() => {
    setSignUpAndInModal({ signIn: false, signUp: true });
    openModal();
  }, [signUpAndInModal]);
  const onSignInClick = useCallback(() => {
    setSignUpAndInModal({ signIn: true, signUp: false });
    openModal();
  }, [signUpAndInModal]);

  return (
    <>
      <Container
        className={`${
          modalOpenState ? 'filter blur-sm' : ''
        } p-0 flex justify-center`}
      >
        <Link href="/">
          <a>
            <div className="header-wrapper ">
              <YasumiCol className="header-logo" />
              <YasumiTxt className="header-txt" />
            </div>
          </a>
        </Link>
        {!isLogged && (
          <>
            <div className="header-auth-btns flex">
              <button
                type="button"
                className="shadow-xl rounded-full py-3 px-6 header-sign-up-btn"
                onClick={onSignUpClick}
              >
                회원가입
              </button>
              <button
                type="button"
                className="shadow-xl ml-8 mr-8 rounded-full py-3 px-6 header-sign-in-btn"
                onClick={onSignInClick}
              >
                로그인
              </button>
            </div>
          </>
        )}
        {isLogged && <HeaderUserProfile />}
      </Container>
      <ModalPotal>
        {signUpAndInModal.signUp && <SignUpModal closeModal={closeModal} />}
        {signUpAndInModal.signIn && <SignInModal closeModal={closeModal} />}
      </ModalPotal>
    </>
  );
};

export default Header;
