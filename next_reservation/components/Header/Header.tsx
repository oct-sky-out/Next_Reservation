import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useSelector } from '../../store/index';
import Container from '../../styles/components/Header/Header';
import YasumiCol from '../../public/static/yasumi/yasumi_col.svg';
import YasumiTxt from '../../public/static/yasumi/yasumi_txt.svg';
import SignUpModal from '../Auth/SignUpModal';
import SignInModal from '../Auth/SignInModal';
import useModal from '../hooks/useModal';

const Header: React.FC = () => {
  const { openModal, ModalPotal, getModalOpenedState, closeModal } = useModal();
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
      <Container className={getModalOpenedState() ? 'filter blur-md' : ''}>
        <Link href="/">
          <a>
            <div className="header-wrapper ">
              <YasumiCol className="header-logo" />
              <YasumiTxt className="header-txt" />
            </div>
          </a>
        </Link>
        <div className="header-auth-btns">
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

        <div
          className="modal fade"
          id="exampleModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">...</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <ModalPotal>
        {signUpAndInModal.signUp && <SignUpModal closeModal={closeModal} />}
        {signUpAndInModal.signIn && <SignInModal closeModal={closeModal} />}
      </ModalPotal>
    </>
  );
};

export default Header;
