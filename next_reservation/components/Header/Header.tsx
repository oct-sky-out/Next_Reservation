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
        } p-0 flex justify-center h-18 md:space-between`}
      >
        <Link href="/">
          <a className="w-1/2">
            <div className="header-wrapper flex justify-center space-x-2 w-full">
              <YasumiCol className="header-logo w-3 md:w-3" />
              <YasumiTxt className="header-txt w-28 md:w-36" />
            </div>
          </a>
        </Link>
        {!isLogged && (
          <>
            <div className="w-1/2 flex items-center justify-center header-auth-btns flex space-x-3 mr-8">
              <button
                type="button"
                className="w-1/2 md:w-100px h-30 bg-emerald rounded-full p-2 md:py-3 md:px-3 header-sign-up-btn text-sm md:text-md"
                onClick={onSignUpClick}
              >
                회원가입
              </button>
              <button
                type="button"
                className="w-1/2 md:w-100px mr-8 rounded-full bg-emerald md:py-3 p-2 md:px-3 header-sign-in-btn text-sm md:text-md"
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
