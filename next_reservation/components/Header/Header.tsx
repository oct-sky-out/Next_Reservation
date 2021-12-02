import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useSelector } from '../../store/index';
import Container from '../../styles/components/Header/Header';
import YasumiCol from '../../public/static/yasumi/yasumi_col.svg';
import YasumiTxt from '../../public/static/yasumi/yasumi_txt.svg';
import SignUpModal from '../Auth/SignUpModal';
import SignInModal from '../Auth/SignInModal';
import useModal from '../hooks/useModal';
import HeaderUserProfile from './HeaderUserProfile';

const Header: React.FC = () => {
  const { isLogged, modalOpenState } = useSelector((selector) => ({
    isLogged: selector.user.logged,
    modalOpenState: selector.modalState.modalState,
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
          modalOpenState ? 'filter blur-md' : ''
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
        {isLogged && <HeaderUserProfile />}
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
      </Container>
      <ModalPotal>
        {signUpAndInModal.signUp && <SignUpModal closeModal={closeModal} />}
        {signUpAndInModal.signIn && <SignInModal closeModal={closeModal} />}
      </ModalPotal>
    </>
  );
};

export default Header;
