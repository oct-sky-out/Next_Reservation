import { useRouter } from 'next/router';
import React, { useState, useCallback } from 'react';
import { useSelector } from '@/store/index';
import { useDispatch } from 'react-redux';
import { userSignInAndUpActions } from '@/store/userSignInAndUp';
import { getAuth } from 'firebase/auth';
import { clientApp } from '../../firebaseClient';
import nookies from 'nookies';
import OutsideClickHandler from 'react-outside-click-handler';
import HeaderUserProfileStyle from '@/styles/components/Header/HeaderUserProfile';

const HeaderUserProfile = () => {
  //*Router
  const router = useRouter();
  //* friebase Auth
  const auth = getAuth(clientApp);
  //* redux
  const dispatch = useDispatch();
  const { userPicture } = useSelector((selector) => {
    return {
      userPicture: selector.user.data.userPicture,
    };
  });

  //* 유저 프로파일 메뉴 열림 닫힘
  const [isUserMenuOpened, setIsUserMenuOpened] = useState(false);

  //* 로그아웃 버튼 누를 시 로그아웃, 쿠키 삭제
  const signOutAndDeleteCookie = useCallback(() => {
    try {
      auth
        .signOut()
        .then(() => {
          dispatch(
            userSignInAndUpActions.userSignInOrUpSuccess({
              type: '',
              email: '',
              name: '',
              token: '',
              brithDay: new Date().toISOString(),
              userPicture: '',
            })
          );
          dispatch(userSignInAndUpActions.setLogeed(false));
          nookies.destroy(null, 'access_token');
        })
        .catch((error: any) => {
          throw error;
        });
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  const goingRegistRyokan = useCallback(() => {
    router.push('/room/register/ryokan');
    setIsUserMenuOpened(false);
  }, []);

  const goingMyAccount = useCallback(() => {
    router.push('/my/account');
    setIsUserMenuOpened(false);
  }, []);

  const goingManageRyokan = useCallback(() => {
    router.push('/room/manage');
    setIsUserMenuOpened(false);
  }, []);

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        if (isUserMenuOpened) {
          setIsUserMenuOpened(false);
        }
      }}
    >
      <HeaderUserProfileStyle>
        <button
          type="button"
          className="relative right-10 shadow-xl w-20 border-4 border-emerald rounded-full py-3 px-6 header-user-profile"
          onClick={() => {
            setIsUserMenuOpened(!isUserMenuOpened);
          }}
        >
          <img
            src="/_next/static/image/public/static/user/default_user_picture.0864b7391dea61a6ccfc62059ab89fd2.png"
            className="header-user-profile-image"
          />
        </button>
        {isUserMenuOpened && (
          <>
            <div className="w-60 h-30 absolute rounded-lg header-user-profile-wrapper flex flex-column">
              <button
                onClick={goingMyAccount}
                type="button"
                className="py-3 px-6 header-user-profile-management text-black border-b-2 border-emerald"
              >
                계정
              </button>
              <button
                onClick={goingManageRyokan}
                type="button"
                className="py-3 px-6 text-black border-b-2 border-emerald"
              >
                숙소관리
              </button>
              <button
                onClick={goingRegistRyokan}
                type="button"
                className="py-3 px-6 text-black border-b-2 border-emerald register-ryokan"
              >
                숙소등록
              </button>
              <button
                type="button"
                className="py-3 px-6 header-user-logout text-black"
                onClick={signOutAndDeleteCookie}
              >
                로그아웃
              </button>
            </div>
          </>
        )}
      </HeaderUserProfileStyle>
    </OutsideClickHandler>
  );
};

export default HeaderUserProfile;
