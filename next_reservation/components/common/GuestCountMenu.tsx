import { useSelector } from '@/store/index';
import { searchRoomActions } from '@/store/searchRoom';
import { useDispatch } from 'react-redux';
import OutsideClickHandler from 'react-outside-click-handler';
import { ActionCreatorWithPreparedPayload } from '@reduxjs/toolkit';

type peopleDispatcherType = (peopleCount: number) => {
  payload: number;
  type: string;
};
interface IProps {
  isGusetCountMenuOpend: boolean;
  setIsGusetCountMenuOpend: (state: boolean) => void;
  adultCount: number;
  setAdultCountAction: peopleDispatcherType;
  childrenCount: number;
  setChildrenCountAction: peopleDispatcherType;
  infantsCount: number;
  setInfantsCountAction: peopleDispatcherType;
}

const GuestCountMenu: React.FC<IProps> = ({
  isGusetCountMenuOpend,
  setIsGusetCountMenuOpend,
  adultCount,
  childrenCount,
  infantsCount,
  setAdultCountAction,
  setChildrenCountAction,
  setInfantsCountAction,
  children,
}) => {
  //* redux
  const dispatch = useDispatch();

  const adultGuestAddSub = (count: number) => {
    dispatch(setAdultCountAction(count));
  };
  const childrenGuestAddSub = (count: number) => {
    dispatch(setChildrenCountAction(count));
  };
  const infantsGuestAddSub = (count: number) => {
    dispatch(setInfantsCountAction(count));
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        if (isGusetCountMenuOpend) {
          setIsGusetCountMenuOpend(false);
        }
      }}
    >
      <div className="relative">
        {children}
        {isGusetCountMenuOpend && (
          <>
            <div className="w-400 h-30 p-3 absolute top-12 rounded-lg flex flex-column bg-white space-y-3">
              <div>
                <div className="flex-none flex justify-around items-center flex-wrap p-3">
                  <div className="w-1/2 space-y-3">
                    <span className="block">성 인</span>
                    <span className="block text-sm">만 13세 이상</span>
                  </div>
                  <button
                    className={`w-10 h-10 border-2 ${
                      !adultCount
                        ? 'border-gray-500 text-gray-500'
                        : 'border-emerald'
                    }  rounded-full`}
                    value="sub"
                    onClick={() => adultGuestAddSub(adultCount - 1)}
                    disabled={!adultCount}
                    cy-test="adult-sub"
                  >
                    -
                  </button>
                  <span>{adultCount}</span>
                  <button
                    className="w-10 h-10 border-2 rounded-full border-emerald"
                    value="add"
                    onClick={() => adultGuestAddSub(adultCount + 1)}
                    cy-test="adult-add"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex-none flex justify-around items-center p-3">
                <div className="w-1/2 space-y-3">
                  <span className="block">어린이</span>
                  <span className="block text-sm">만 2~12세</span>
                </div>
                <button
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
                <span>{childrenCount}</span>
                <button
                  className="w-10 h-10 border-2 rounded-full border-emerald"
                  value="add"
                  onClick={() => childrenGuestAddSub(childrenCount + 1)}
                >
                  +
                </button>
              </div>
              <div className="flex-none flex justify-around items-center p-3">
                <div className="w-1/2 space-y-3">
                  <span className="block">영유아</span>
                  <span className="block text-sm">만 2세 미만</span>
                </div>
                <button
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
                <span>{infantsCount}</span>
                <button
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

export default GuestCountMenu;
