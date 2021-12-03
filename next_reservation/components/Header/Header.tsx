import React from 'react';
import Link from 'next/link';
import { useSelector } from '../../store/index';
import Container from '../../styles/components/Header/Header';
import YasumiCol from '../../public/static/yasumi/yasumi_col.svg';
import YasumiTxt from '../../public/static/yasumi/yasumi_txt.svg';
import HeaderUserProfile from './HeaderUserProfile';

const Header: React.FC = () => {
  const { modalOpenState } = useSelector((selector) => ({
    modalOpenState: selector.modalState.modalState,
  }));

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
        <HeaderUserProfile />
      </Container>
    </>
  );
};

export default Header;
