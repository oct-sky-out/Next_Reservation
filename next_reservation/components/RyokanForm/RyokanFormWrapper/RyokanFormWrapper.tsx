import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'store';
import RegisterRyokanStyle from '@/styles/components/Register/RegisterRyokan';
import RegisterLeftSideInformation from '../LeftSideProcedureInformation/LeftSideInformation';
import RegisterFooter from '../Footer/Footer';
import { registerRyokanActions } from '@/store/registerRyokan';
import { IRyokanType } from '@/types/reduxActionTypes/ReduxRegiserRyokanType';

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
  const modalState = useSelector((selector) => selector.modalState.modalState);
  const router = useRouter();

  useEffect(() => {
    const savedData = localStorage.getItem('savedRegisterRyokanData');

    if (savedData) {
      dispatch(
        registerRyokanActions.setRyokanForm(
          JSON.parse(savedData) as IRyokanType
        )
      );
    }
  }, [router.pathname]);

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