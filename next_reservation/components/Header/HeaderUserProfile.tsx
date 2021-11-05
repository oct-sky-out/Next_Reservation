import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useSelector } from '../../store/index';
import { useDispatch } from 'react-redux';

const HeaderUserProfile = () => {
  // * redux
  const dispatch = useDispatch();
  const { userProfile, logged } = useSelector((selector) => {
    return { userProfile: selector.user.data, logged: selector.user.logged };
  });
  //* 유저 프로파일 메뉴 열림 닫힘
  const [isUserMenuOpened, setIsUserMenuOpened] = useState(false);

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        if (isUserMenuOpened) {
          setIsUserMenuOpened(false);
        }
      }}
    >
      <button
        type="button"
        className="shadow-xl rounded-full py-3 px-6 header-user-profile"
        onClick={() => {
          setIsUserMenuOpened(!isUserMenuOpened);
        }}
      >
        <img
          src={userProfile.userPicture.src}
          className="header-user-profile-image"
        />
      </button>
      {isUserMenuOpened && (
        <>
          <button
            type="button"
            className="shadow-xl rounded-full py-3 px-6 header-user-profile-management"
          >
            계정
          </button>
          <button
            type="button"
            className="shadow-xl rounded-full py-3 px-6 header-user-logout"
          >
            로그아웃
          </button>
        </>
      )}
    </OutsideClickHandler>
  );
};

export default HeaderUserProfile;
