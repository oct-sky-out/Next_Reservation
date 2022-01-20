import { useSelector } from '@/store/index';
import { searchRoomActions } from '@/store/searchRoom';
import { useDispatch } from 'react-redux';
import OutsideClickHandler from 'react-outside-click-handler';

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
      <div className="relative">
        {children}
        {isGusetCountMenuOpend && (
          <>
            <div className="w-60 h-30 p-3 absolute top-12 rounded-lg flex flex-column bg-white space-y-3">
              <div className="flex-none flex justify-around items-center">
                <span>성 인</span>
                <button
                  className={`w-10 h-10 ml-3 border-2 ${
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
                <span>{adultCount}</span>
                <button
                  className="w-10 h-10 border-2 rounded-full border-emerald"
                  value="add"
                  onClick={() => adultGuestAddSub(adultCount + 1)}
                >
                  +
                </button>
              </div>
              <div className="flex-none flex justify-around items-center">
                <span>어린이</span>
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
              <div className="flex-none flex justify-around items-center">
                <span>영유아</span>
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
