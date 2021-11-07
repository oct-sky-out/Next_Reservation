import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useMockStore } from '../../../store/index';
import { useDispatchMock } from '../../../__mocks__/auth/authMocks';

// 실제 파일의 import 할 패키지
import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useSelector } from '../../../store/index';
import { useDispatch } from 'react-redux';

const store = useMockStore;

const HeaderUserProfile = () => {
  // * redux
  const dispatch = useDispatch();
  const { userProfile, logged } = useSelector((selector) => {
    return { userProfile: selector.user.data, logged: selector.user.logged };
  });
  //* 유저 프로파일 메뉴 열림 닫힘
  const [isUserMenuOpened, setIsUserMenuOpened] = useState(false);

  {
    logged && (
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
    return null;
  }
};

beforeEach(() => {
  const dispatchMock = useDispatchMock;
  store.dispatch = dispatchMock;
});

test('회원가입 모달 렌더링', () => {
  useDispatchMock.mockReturnValue(jest.fn());

  render(
    <Provider store={store}>
      <HeaderUserProfile />
    </Provider>
  );
});

test('유저 프로필 버튼을 누르면 메뉴가 열림');

test('유저 프로필이 열린 상태에서 프로필 버튼을 누르면 메뉴가 닫힘');

test('유저 프로필이 열린 상태에서 메뉴 이외의 화면을 누르면 메뉴가 닫힘');
