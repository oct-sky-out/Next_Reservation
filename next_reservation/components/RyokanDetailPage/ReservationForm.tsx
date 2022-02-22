import { useState } from 'react';
import { useSelector } from '@/store/index';
import DatePicker from '@/components/common/DatePicker';
import GuestCountMenu from '@/components/MainPage/GuestCountMenu';

const ReservationForm = () => {
  const { checkInDate, checkOutDate } = useSelector((state) => ({
    checkInDate: state.searchRoom.checkInDate,
    checkOutDate: state.searchRoom.checkOutDate,
  }));
  const [isGuestCountMenuOpend, setIsGuestCountMenuOpend] = useState(false);

  return (
    <div className="border-2 border-emerald rounded border-solid divide-y-2 divide-emerald divide-solid">
      <div className="divide-y-2 divide-emerald divide-solid">
        <div className="py-2 text-2xl text-center">
          <span>예약 일정</span>
        </div>
        <div className="py-2 text-lg flex justify-around items-center">
          <span>예약시작 일자</span>
          <DatePicker
            className="w-32 border-none"
            selected={checkInDate || new Date()}
            placeholderText="예약일자"
            onChange={() => {}}
          />
        </div>
        <div className="py-2 text-lg flex justify-around items-center">
          <span>예약종료 일자</span>
          <DatePicker
            className="w-32 border-none"
            selected={checkInDate || new Date()}
            placeholderText="예약일자"
            onChange={() => {}}
          />
        </div>
      </div>
      <div className="px-12 py-3 space-y-3 text-lg items-center">
        <span>인원수</span>
        <GuestCountMenu
          isGusetCountMenuOpend={isGuestCountMenuOpend}
          setIsGusetCountMenuOpend={setIsGuestCountMenuOpend}
        >
          <input
            data-testid="guest-count-menu-text"
            type="text"
            className="form-control w-full h-8 border-0 p-2"
            placeholder="인원수 추가"
            defaultValue={`성인 ${0}명, 어린이 : ${0}명, 영유아 : ${0}명`}
            onClick={() => setIsGuestCountMenuOpend(true)}
          />
        </GuestCountMenu>
      </div>
      <div className=" text-xl py-3 flex justify-center">
        <button>예약하기</button>
      </div>
    </div>
  );
};

export default ReservationForm;
