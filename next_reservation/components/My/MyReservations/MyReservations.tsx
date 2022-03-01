import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import getReservationsApi from '@/lib/api/my/reservations';
import { myReservationsActions } from '@/store/myReservations';
import ReservationCard from './ReservationCard';
import { v4 } from 'uuid';
import MyPageMenu from '../MyPageMenu';

const MyReservations = () => {
  const { email, reservations } = useSelector((state) => ({
    email: state.user.data.email,
    reservations: state.myReservations,
  }));
  const dispatch = useDispatch();

  const fetchUserReservations = useCallback(async () => {
    const reservationsResult = await getReservationsApi(email);
    dispatch(myReservationsActions.setReservaions(reservationsResult));
  }, [email]);

  useEffect(() => {
    fetchUserReservations();
  }, [fetchUserReservations]);

  return (
    <div className="w-full h-screen text-black space-y-10">
      <div className="w-2/3 mx-auto mt-10 space-x-3 flex justify-center">
        <MyPageMenu />
      </div>
      <h1 className="w-2/3 mx-auto text-3xl ">내 예약정보</h1>
      <div className="w-2/3 mx-auto  border-2 border-solid border-emerald rounded-lg p-5 space-y-10">
        {reservations.map((reservation) => (
          <ReservationCard reservation={reservation} key={v4()} />
        ))}
      </div>
    </div>
  );
};

export default MyReservations;
