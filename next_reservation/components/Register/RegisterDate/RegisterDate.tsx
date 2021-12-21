//! component import
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { registerRyokanActions } from '@/store/registerRyokan';
import { registerFormValidAction } from '@/store/registerFormIsValid';
import DatePicker from '@/components/common/DatePicker';

const RegisterTitleAndDescription = () => {
  const dispatch = useDispatch();
  const { openDate, closeDate } = useSelector((selector) => ({
    openDate: selector.registerRyokan.date.openDate,
    closeDate: selector.registerRyokan.date.closeDate,
  }));

  useEffect(() => {
    if (openDate && closeDate) dispatch(registerFormValidAction.setValid(true));
    if (!(openDate && closeDate))
      dispatch(registerFormValidAction.setValid(false));
  }, [openDate, closeDate]);

  const changedReservationStartDate = (
    date: Date,
    _e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(registerRyokanActions.setOpenDate(date));
  };

  const changedReservationEndDate = (
    date: Date,
    _e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(registerRyokanActions.setCloseDate(date));
  };

  return (
    <div className="w-full h-outOfHeader text-black col-start-2 animate-fadeInAndUpForm register-form overflow-scroll">
      <div className="w-2/3 h-2/3 mx-auto my-5 relative ">
        <div className=" w-full h-1/3 absolute space-y-10 top-1/3">
          <div className="flex flex-col space-y-5">
            <span className="text-2xl">료칸 예약 시작일</span>
            <DatePicker
              selected={openDate}
              placeholderText="예약 시작날짜"
              onChange={changedReservationStartDate}
              minDate={new Date()}
              name="reservationStart"
              className="w-1/2 h-12 text-xl"
            />
          </div>
          <div className="flex flex-col space-y-5">
            <span className="text-2xl">료칸 예약 종료일</span>
            <DatePicker
              selected={closeDate}
              placeholderText="예약 종료날짜"
              onChange={changedReservationEndDate}
              minDate={openDate || undefined}
              name="reservationEnd"
              className="w-1/2 h-12 text-xl"
              disabled={!openDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterTitleAndDescription;
