import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { reservationActions } from '@/store/reservation';
import axios from '@/lib/api';
import Swal from 'sweetalert2';
import DatePicker from '@/components/common/DatePicker';
import GuestCountMenu from '@/components/common/GuestCountMenu';

const ReservationForm = () => {
  const router = useRouter();
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
    email,
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
    email: state.user.data.email,
  }));
  const dispatch = useDispatch();
  const [isGuestCountMenuOpend, setIsGuestCountMenuOpend] = useState(false);
  const peopleCountResult = useMemo(
    () =>
      `성인 ${adultCount}명, 어린이 : ${childrenCount}명, 영유아 : ${infantsCount}명`,
    [adultCount, childrenCount, infantsCount]
  );

  const clickReservation = async () => {
    try {
      dispatch(reservationActions.setRyokanId(ryokanId));
      const { data } = await axios.post('/api/reserve', {
        email,
        reserveId: ryokanId,
        adultCount,
        childrenCount,
        infantsCount,
        checkIn: startDate,
        checkOut: endDate,
      });
      if (data) {
        Swal.fire({
          toast: true,
          title: '예약성공',
          text: '예약을 완료했습니다.',
          icon: 'success',
          position: 'top-end',
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: false,
          showCloseButton: true,
        });
        router.push('/my/reservations');
      }
    } catch {
      Swal.fire({
        toast: true,
        title: '에약실패',
        text: '예약에 실패했습니다.',
        icon: 'error',
        position: 'top-end',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true,
      });
    }
  };

  useEffect(() => {
    dispatch(
      reservationActions.setPeopleCount({
        adultCount: searchAdultCount,
        childrenCount: searchChildrenCount,
        infantsCount: searchInfantsCount,
      })
    );
    if (searchCheckInDate && searchCheckOutDate) {
      dispatch(
        reservationActions.setDate({
          startDate: searchCheckInDate.toISOString(),
          endDate: searchCheckOutDate.toISOString(),
        })
      );
    }
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
            selected={new Date(startDate)}
            minDate={new Date()}
            placeholderText="예약일자"
            onChange={(date) => {
              dispatch(
                reservationActions.setStartDate(date.toLocaleString('ko-KR'))
              );
            }}
          />
        </div>
        <div className="py-2 text-lg flex justify-around items-center">
          <span>예약종료 일자</span>
          <DatePicker
            className="w-32 border-none"
            selected={new Date(endDate)}
            minDate={new Date(startDate)}
            placeholderText="예약일자"
            onChange={(date) => {
              dispatch(
                reservationActions.setEndDate(date.toLocaleString('ko-KR'))
              );
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
