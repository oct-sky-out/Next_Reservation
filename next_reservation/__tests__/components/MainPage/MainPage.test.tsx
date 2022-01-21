//! test import
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { useMockStore } from '../../../store';
import {
  mockStoreValue,
  useDispatchMock,
  useSelectorMock,
} from '../../../__mocks__/redux/reduxStateMocks';

//! componet import
//* GuestCountMennu,
import React from 'react';
//* RoomSearchBar
import { useState } from 'react';
//* GuestCountMennu
import OutsideClickHandler from 'react-outside-click-handler';
//* RecommendationRegion;
import { v4 } from 'uuid';
//* RoomSearchBar
import { AiOutlineSearch } from 'react-icons/ai';
//* RoomSearchBar
import { useDispatch } from 'react-redux';
//* RoomSearchBar, MainPage
import { useSelector } from '@/store/index';
//* RoomSearchBar, GuestCountMennu,
import { searchRoomActions } from '@/store/searchRoom';
//* RoomSearchBar
import DatePicker from '@/components/common/DatePicker';

interface IProps {
  isGusetCountMenuOpend: boolean;
  setIsGusetCountMenuOpend: (state: boolean) => void;
}

const GuestCountMenu: React.FC<IProps> = ({
  isGusetCountMenuOpend,
  setIsGusetCountMenuOpend,
  children,
}) => {
  //* redux
  const dispatch = useDispatch();
  const { adultCount, childrenCount, infantsCount } = useSelector(
    (selector) => ({
      adultCount: selector.searchRoom.adultCount,
      childrenCount: selector.searchRoom.childrenCount,
      infantsCount: selector.searchRoom.infantsCount,
    })
  );

  const adultGuestAddSub = (count: number) => {
    dispatch(searchRoomActions.setAdultCount(count));
  };
  const childrenGuestAddSub = (count: number) => {
    dispatch(searchRoomActions.setChildrenCount(count));
  };
  const infantsGuestAddSub = (count: number) => {
    dispatch(searchRoomActions.setInfantsCount(count));
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        if (isGusetCountMenuOpend) {
          setIsGusetCountMenuOpend(false);
        }
      }}
    >
      <div>
        {children}
        {isGusetCountMenuOpend && (
          <>
            <div className="w-60 h-30 absolute rounded-lg flex flex-column">
              <div className="flex-none w-32 flex justify-around items-center">
                <button
                  data-testid="adult-guest-sub-button"
                  className={`w-10 h-10 border-2 ${
                    !adultCount
                      ? 'border-gray-500 text-gray-500'
                      : 'border-emerald'
                  }  rounded-full`}
                  value="sub"
                  onClick={() => adultGuestAddSub(adultCount - 1)}
                  disabled={!adultCount}
                >
                  -
                </button>
                <span data-testid="adult-guest-count-text">{adultCount}</span>
                <button
                  data-testid="adult-guest-add-button"
                  className="w-10 h-10 border-2 rounded-full border-emerald"
                  value="add"
                  onClick={() => adultGuestAddSub(adultCount + 1)}
                >
                  +
                </button>
              </div>
              <div className="flex-none w-32 flex justify-around items-center">
                <button
                  data-testid="children-guest-sub-button"
                  className={`w-10 h-10 border-2 ${
                    !childrenCount
                      ? 'border-gray-500 text-gray-500'
                      : 'border-emerald'
                  }  rounded-full`}
                  value="sub"
                  onClick={() => childrenGuestAddSub(childrenCount - 1)}
                  disabled={!childrenCount}
                >
                  -
                </button>
                <span data-testid="children-guest-count-text">
                  {childrenCount}
                </span>
                <button
                  data-testid="children-guest-add-button"
                  className="w-10 h-10 border-2 rounded-full border-emerald"
                  value="add"
                  onClick={() => childrenGuestAddSub(childrenCount + 1)}
                >
                  +
                </button>
              </div>
              <div className="flex-none w-32 flex justify-around items-center">
                <button
                  data-testid="infants-guest-sub-button"
                  className={`w-10 h-10 border-2 ${
                    !infantsCount
                      ? 'border-gray-500 text-gray-500'
                      : 'border-emerald'
                  }  rounded-full`}
                  value="sub"
                  onClick={() => infantsGuestAddSub(infantsCount - 1)}
                  disabled={!infantsCount}
                >
                  -
                </button>
                <span data-testid="infants-guest-count-text">
                  {infantsCount}
                </span>
                <button
                  data-testid="infants-guest-add-button"
                  className="w-10 h-10 border-2 rounded-full border-emerald"
                  value="add"
                  onClick={() => infantsGuestAddSub(infantsCount + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </OutsideClickHandler>
  );
};

const RoomSearchBar = () => {
  const {
    location,
    latitude,
    longitude,
    checkInDate,
    checkOutDate,
    adultCount,
    childrenCount,
    infantsCount,
  } = useSelector((selector) => ({
    location: selector.searchRoom.location,
    latitude: selector.searchRoom.latitude,
    longitude: selector.searchRoom.longitude,
    checkInDate: selector.searchRoom.checkInDate,
    checkOutDate: selector.searchRoom.checkOutDate,
    adultCount: selector.searchRoom.adultCount,
    childrenCount: selector.searchRoom.childrenCount,
    infantsCount: selector.searchRoom.infantsCount,
  }));
  const dispatch = useDispatch();

  const [isGuestCountMenuOpend, setIsGuestCountMenuOpend] = useState(false);
  return (
    <div className="w-1/2 bg-white rounded-full mx-auto my-5 text-black flex justify-between">
      <div className="w-1/5 rounded-full px-4 py-2 inline-block hover:bg-gray-100">
        <span className="text-sm">위치</span>
        <input
          data-testid="location-input"
          type="text"
          className="form-control h-8 mt-1 p-2 w-full border-0"
          placeholder="위치입력"
          onChange={({ target: { value } }) => {
            dispatch(searchRoomActions.setLocation(value));
          }}
        />
      </div>
      <div className="w-1/5 rounded-full inline-block py-2 px-4 hover:bg-gray-100">
        <span className="text-sm">체크인</span>
        <DatePicker
          data-testid="check-in-input"
          className="form-control w-full h-8 p-2 mt-1 border-0"
          selected={checkInDate}
          placeholderText="체크인 날짜입력"
          onChange={(date) => {
            dispatch(searchRoomActions.setCheckInDate(date));
          }}
        />
      </div>
      <div className="w-1/5 rounded-full inline-block py-2 px-4 hover:bg-gray-100">
        <span className="text-sm">체크아웃</span>
        <DatePicker
          data-testid="check-out-input"
          className="form-control w-full h-8 p-2 mt-1 border-0"
          selected={checkOutDate}
          placeholderText="체크아웃 날짜입력"
          onChange={(date) => {
            dispatch(searchRoomActions.setCheckOutDate(date));
          }}
        />
      </div>
      <div className="w-1/5 rounded-full inline-block py-2 px-4 hover:bg-gray-100">
        <span className="text-sm">인원</span>
        <GuestCountMenu
          isGusetCountMenuOpend={isGuestCountMenuOpend}
          setIsGusetCountMenuOpend={setIsGuestCountMenuOpend}
        >
          <input
            data-testid="guest-count-menu-text"
            type="text"
            className="form-control w-full h-8 border-0 p-2"
            placeholder="인원수 추가"
            value={`성인 ${adultCount}명, 어린이 : ${childrenCount}명, 영유아 : ${infantsCount}`}
            onClick={() => setIsGuestCountMenuOpend(true)}
          />
        </GuestCountMenu>
      </div>
      <div className="w-20 text-white cursor-pointer flex align-center">
        <div className="w-20 rounded-full bg-emerald ml-auto mr-1 my-auto py-3 ">
          <AiOutlineSearch size="32" className="mx-auto my-0" />
        </div>
      </div>
    </div>
  );
};

const MainPageSignBoard = () => {
  return (
    <div className="bg-black w-full h-800">
      <div className="mx-auto h-full w-1/2 bg-mainImage-camping bg-no-repeat bg-cover bg-center flex items-end p-10">
        <div className="w-full bottom-10 left-5">
          <span className="inline-block text-emerald text-8xl text-shadow-xl">
            YASUMI
          </span>
          <span className="inline-block text-7xl text-shadow-xl">와 함께</span>
          <span className="block text-5xl text-shadow-xl">
            몸과 마음의 쉴 곳을 찾아요.
          </span>
        </div>
      </div>
    </div>
  );
};

const RecommendationRegion = () => {
  const urlsAndRegionName = [
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/next-reservation.appspot.com/o/mainpage%2Fseoul.jpg?alt=media&token=1d91ddee-5eb4-49b3-a56e-08784f2abea0',
      region: '서울',
    },
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/next-reservation.appspot.com/o/mainpage%2Fbusan.jpg?alt=media&token=f353fdda-644f-45d2-8753-d27e23307b69',
      region: '부산',
    },

    {
      url: 'https://firebasestorage.googleapis.com/v0/b/next-reservation.appspot.com/o/mainpage%2Fgwangju.jpg?alt=media&token=242127c2-7ba5-4b59-b4da-a3be13aa0d85',
      region: '광주',
    },

    {
      url: 'https://firebasestorage.googleapis.com/v0/b/next-reservation.appspot.com/o/mainpage%2Fjeju.jpg?alt=media&token=1d268124-89f7-414e-bf62-8b56531674bc',
      region: '제주',
    },
  ];
  return (
    <div className="w-full p-10">
      <div className="flex flex-wrap justify-around items-center">
        {urlsAndRegionName.map((region) => (
          <div
            key={v4()}
            className="items-center mx-2 border-4 border-solid border-emerald w-1/5 p-2 rounded-xl transition ease-in-out transform translate-y-0 hover:-translate-y-25 hover:scale-110 duration-300 cursor-pointer"
          >
            <img
              className="w-full h-300 rounded-xl object-cover object-bottom"
              src={region.url}
              alt={region.region}
            />
            <div className="w-full py-2">
              <span className="text-3xl my-auto">{region.region}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MainPage = () => {
  const modalOpenState = useSelector(
    (selector) => selector.modalState.modalState
  );

  return (
    <div
      className={`h-full grid grid-cols-1 ${
        modalOpenState ? 'filter blur-md' : ''
      } bg-black`}
    >
      <RoomSearchBar />
      <MainPageSignBoard />
      <RecommendationRegion />
    </div>
  );
};

const store = useMockStore;

beforeEach(() => {
  const dispatchMock = useDispatchMock;
  store.dispatch = dispatchMock;
  useSelectorMock.mockImplementation((selector) => selector(mockStoreValue));
  render(
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
});

test('위치, 체크인 날짜, 체크아웃 날짜, 게스트 인원 입력시 리덕스에 매핑된 state의 값이 바뀌어야한다.', async () => {
  const locationInput = await screen.getByTestId<HTMLInputElement>(
    'location-input'
  );
  userEvent.type(locationInput, '서울특별시');
  expect(store.getState().searchRoom.location).toBe('서울특별시');

  const checkInInput = await screen.getByPlaceholderText<HTMLInputElement>(
    '체크인 날짜입력'
  );
  userEvent.click(checkInInput);
  expect(await screen.getByText('12')).toBeVisible();
  userEvent.click(await screen.getByText('12'));
  expect(store.getState().searchRoom.checkInDate).not.toBeNull();

  const checkOutInput = await screen.getByPlaceholderText<HTMLInputElement>(
    '체크아웃 날짜입력'
  );
  userEvent.click(checkOutInput);
  expect(await screen.getByText('12')).toBeVisible();
  userEvent.click(await screen.getByText('12'));
  expect(store.getState().searchRoom.checkOutDate).not.toBeNull();

  const guestCountText = await screen.getByTestId<HTMLInputElement>(
    'guest-count-menu-text'
  );
  userEvent.click(guestCountText);

  const adultGuestAddButton = await screen.getByTestId<HTMLButtonElement>(
    'adult-guest-add-button'
  );

  userEvent.click(adultGuestAddButton);
  expect(store.getState().searchRoom.adultCount).toBe(1);

  const childrenAddButton = await screen.getByTestId<HTMLButtonElement>(
    'children-guest-add-button'
  );

  userEvent.click(childrenAddButton);
  expect(store.getState().searchRoom.childrenCount).toBe(1);

  const infantsAddButton = await screen.getByTestId<HTMLButtonElement>(
    'infants-guest-add-button'
  );

  userEvent.click(infantsAddButton);
  expect(store.getState().searchRoom.infantsCount).toBe(1);
});
