import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'store';
import RegisterRyokanStyle from '@/styles/components/Register/RegisterRyokan';
import RegisterLeftSideInformation from '../LeftSideProcedureInformation/LeftSideInformation';
import RegisterFooter from '../Footer/Footer';
import { ryokanFormActions, RyokanType } from '@/store/ryokanForm';
import { IRyokanType } from '@/types/reduxActionTypes/ReduxRyokanType';
import axios from '@/lib/api';
import { isRenderdAction } from '@/store/isRenderd';

interface IPorps {
  producerText: string;
  priviousHref: string;
  nextHref: string;
  step: number;
}

const RegisterRyokan: React.FC<IPorps> = ({
  producerText,
  priviousHref,
  nextHref,
  step,
  children,
}) => {
  const dispatch = useDispatch();
  const { modalState, ryokanForm, isRenderd } = useSelector((selector) => ({
    modalState: selector.modalState.modalState,
    ryokanForm: selector.ryokanForm,
    isRenderd: selector.isRendered,
  }));
  const router = useRouter();

  const wrapperDidMountingSetRyokanForm = async () => {
    if (router.pathname.includes('manage')) {
      const { data } = await axios.get<RyokanType>(
        `/api/ryokan/searchRyokanByTitle?title=${router.query.ryokan}`
      );
      dispatch(ryokanFormActions.setRyokanForm(data));
    }
    if (router.pathname.includes('register'))
      localStorage.setItem(
        'savedRegisterRyokanData',
        JSON.stringify({
          ...ryokanForm,
          option: { isEdit: false, ryokanId: '' },
        } as RyokanType)
      );
  };

  useEffect(() => {
    if (router.pathname.includes('register')) {
      const savedData = localStorage.getItem('savedRegisterRyokanData');
      if (savedData) {
        const ryokan = JSON.parse(savedData);
        dispatch(ryokanFormActions.setRyokan(ryokan as IRyokanType));
      }
    }
  }, [router.pathname]);

  useEffect(() => {
    if (!isRenderd) wrapperDidMountingSetRyokanForm();
    dispatch(isRenderdAction.setRendered(true));
  }, []);

  return (
    <RegisterRyokanStyle>
      <div
        className={`${
          modalState ? 'filter blur-sm' : ''
        } grid grid-cols-2 grid-rows-1 h-full`}
      >
        <RegisterLeftSideInformation proceduerText={producerText} />
        {children}
        <RegisterFooter
          nextHref={nextHref}
          previousHref={priviousHref}
          step={step}
        />
      </div>
    </RegisterRyokanStyle>
  );
};

export default RegisterRyokan;
