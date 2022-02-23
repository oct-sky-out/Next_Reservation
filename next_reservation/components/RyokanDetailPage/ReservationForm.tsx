import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { reservationActions } from '@/store/reservation';
import DatePicker from '@/components/common/DatePicker';
import GuestCountMenu from '@/components/common/GuestCountMenu';

const ReservationForm = () => {
  const {
    adultCount,
    childrenCount,
    infantsCount,
    startDate,
    endDate,
    searchAdultCount,
    searchCheckInDate,
    searchCheckOutDate,
    searchChildrenCount,
    searchInfantsCount,
    ryokanId,
  } = useSelector((state) => ({
    adultCount: state.reservation.adultCount,
    childrenCount: state.reservation.childrenCount,
    infantsCount: state.reservation.infantsCount,
    startDate: state.reservation.startDate,
    endDate: state.reservation.endDate,
    searchAdultCount: state.searchRoom.adultCount,
    searchChildrenCount: state.searchRoom.childrenCount,
    searchInfantsCount: state.searchRoom.infantsCount,
    searchCheckInDate: state.searchRoom.checkInDate,
    searchCheckOutDate: state.searchRoom.checkOutDate,
    ryokanId: state.ryokanDetail.id,
  }));
  const dispatch = useDispatch();
  const [isGuestCountMenuOpend, setIsGuestCountMenuOpend] = useState(false);
  const peopleCountResult = useMemo(
    () =>
      `성인 ${adultCount}명, 어린이 : ${childrenCount}명, 영유아 : ${infantsCount}명`,
    [adultCount, childrenCount, infantsCount]
  );

  const clickReservation = () => {
    dispatch(reservationActions.setRyokanId(ryokanId));
  };

  useEffect(() => {
    dispatch(
      reservationActions.setPeopleCount({
        adultCount: searchAdultCount,
        childrenCount: searchChildrenCount,
        infantsCount: searchInfantsCount,
      })
    );
    dispatch(
      reservationActions.setDate({
        startDate: searchCheckInDate!,
        endDate: searchCheckOutDate!,
      })
    );
  }, []);

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
            selected={startDate || new Date()}
            minDate={new Date()}
            placeholderText="예약일자"
            onChange={(date) => {
              dispatch(reservationActions.setStartDate(date));
            }}
          />
        </div>
        <div className="py-2 text-lg flex justify-around items-center">
          <span>예약종료 일자</span>
          <DatePicker
            className="w-32 border-none"
            selected={endDate || new Date()}
            minDate={startDate || new Date()}
            placeholderText="예약일자"
            onChange={(date) => {
              dispatch(reservationActions.setEndDate(date));
            }}
          />
        </div>
      </div>
      <div className="px-12 py-3 space-y-3 text-lg items-center">
        <span>인원수</span>
        <GuestCountMenu
          isGusetCountMenuOpend={isGuestCountMenuOpend}
          setIsGusetCountMenuOpend={setIsGuestCountMenuOpend}
          adultCount={adultCount}
          childrenCount={childrenCount}
          infantsCount={infantsCount}
          setAdultCountAction={reservationActions.setAdultCount}
          setChildrenCountAction={reservationActions.setChildrenCount}
          setInfantsCountAction={reservationActions.setInfantsCount}
          modalWrapperClassName="-left-3.1"
        >
          <input
            data-testid="guest-count-menu-text"
            type="text"
            className="form-control w-full h-8 border-0 p-2 bg-white"
            placeholder="인원수 추가"
            value={peopleCountResult}
            readOnly
            onClick={() => setIsGuestCountMenuOpend(true)}
          />
        </GuestCountMenu>
      </div>
      <div
        className=" text-xl py-3 flex justify-center"
        onClick={clickReservation}
      >
        <button>예약하기</button>
      </div>
    </div>
  );
};

export default ReservationForm;
