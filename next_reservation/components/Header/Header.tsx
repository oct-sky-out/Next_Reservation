import React, { useState, useReducer, useCallback } from 'react';
import Link from 'next/link';
import Container from '../../styles/components/Header/Header';
import YasumiCol from '../../public/static/yasumi/yasumi_col.svg';
import YasumiTxt from '../../public/static/yasumi/yasumi_txt.svg';
import SignUpModal from '../Auth/SignUpModal';
import ModalPotal from '../ModalPotal/Modal';

const Header: React.FC = () => {
  const [activeModal, setActiveModal] = useState(false);
  const [blurClass, setBlurClass] = useState('');
  const onSignUpClick = useCallback(() => {
    setActiveModal(true);
    setBlurClass('filter blur-md');
  }, [activeModal, blurClass]);

  return (
    <>
      <Container className={`${blurClass}`}>
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
      {activeModal && (
        <ModalPotal
          closePotal={() => {
            setActiveModal(false);
            setBlurClass('');
          }}
        >
          <SignUpModal />
        </ModalPotal>
      )}
    </>
  );
};

export default Header;
