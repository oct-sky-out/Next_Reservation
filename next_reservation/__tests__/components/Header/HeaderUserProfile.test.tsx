import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isVisible } from '@testing-library/user-event/dist/utils';
import { Provider } from 'react-redux';
import { useMockStore, useSelector } from '../../../store/index';
import {
  useDispatchMock,
  useSelectorMock,
  mockStoreValue,
} from '../../../__mocks__/redux/reduxStateMocks';

// 실제 파일의 import 할 패키지
import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
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
    return (
      <div>
        <div
          data-testid="close-profile-target"
          style={{ width: '100px', height: '100px' }}
        />
        <OutsideClickHandler
          onOutsideClick={() => {
            if (isUserMenuOpened) {
              setIsUserMenuOpened(false);
            }
          }}
        >
          <button
            type="button"
            data-testid="user-profile-picture-button"
            className="shadow-xl rounded-full py-3 px-6 header-user-profile"
            onClick={() => {
              setIsUserMenuOpened(!isUserMenuOpened);
            }}
          >
            <img
              src="../../public/static/user/default_user_picture.png"
              className="header-user-profile-image"
            />
          </button>
          {isUserMenuOpened && (
            <>
              <button
                data-testid="user-profile-open-button"
                type="button"
                className="shadow-xl rounded-full py-3 px-6 header-user-profile-management"
              >
                계정
              </button>
              <button
                data-testid="user-logout-button"
                type="button"
                className="shadow-xl rounded-full py-3 px-6 header-user-logout"
              >
                로그아웃
              </button>
            </>
          )}
        </OutsideClickHandler>
      </div>
    );
  }
};

beforeEach(() => {
  const dispatchMock = useDispatchMock;
  store.dispatch = dispatchMock;
  useSelectorMock.mockImplementation((selector) => selector(mockStoreValue));
});

test('유저 프로필 버튼을 누르면 메뉴가 열림', async () => {
  render(
    <Provider store={store}>
      <HeaderUserProfile />
    </Provider>
  );

  const userPictureButton = await screen.findByTestId<HTMLButtonElement>(
    'user-profile-picture-button'
  );

  userEvent.click(userPictureButton);

  const userProfileOpenBtn = await screen.findByTestId<HTMLButtonElement>(
    'user-profile-open-button'
  );
  const userLogoutBtn = await screen.findByTestId<HTMLButtonElement>(
    'user-logout-button'
  );

  expect(userProfileOpenBtn).toBeVisible();
  expect(userLogoutBtn).toBeVisible();
});

test('유저 프로필이 열린 상태에서 프로필 버튼을 누르면 메뉴가 닫힘', async () => {
  render(
    <Provider store={store}>
      <HeaderUserProfile />
    </Provider>
  );

  const userPictureButton = await screen.findByTestId<HTMLButtonElement>(
    'user-profile-picture-button'
  );

  userEvent.click(userPictureButton);

  const userProfileOpenBtn = await screen.findByTestId<HTMLButtonElement>(
    'user-profile-open-button'
  );
  const userLogoutBtn = await screen.findByTestId<HTMLButtonElement>(
    'user-logout-button'
  );

  userEvent.click(userPictureButton);

  expect(userProfileOpenBtn).not.toBeVisible();
  expect(userLogoutBtn).not.toBeVisible();
});

test('유저 프로필이 열린 상태에서 메뉴 이외의 화면을 누르면 메뉴가 닫힘', async () => {
  render(
    <Provider store={store}>
      <HeaderUserProfile />
    </Provider>
  );

  const userPictureButton = await screen.findByTestId<HTMLButtonElement>(
    'user-profile-picture-button'
  );

  userEvent.click(userPictureButton);

  const userProfileOpenBtn = await screen.findByTestId<HTMLButtonElement>(
    'user-profile-open-button'
  );
  const userLogoutBtn = await screen.findByTestId<HTMLButtonElement>(
    'user-logout-button'
  );

  const profileCloseTarget = await screen.findByTestId<HTMLDivElement>(
    'close-profile-target'
  );

  userEvent.click(profileCloseTarget);

  expect(userProfileOpenBtn).not.toBeVisible();
  expect(userLogoutBtn).not.toBeVisible();
});
