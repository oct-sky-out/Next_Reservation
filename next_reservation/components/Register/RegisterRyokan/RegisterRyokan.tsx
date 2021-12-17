import React from 'react';
import { useSelector } from 'store';
import RegisterRyokanStyle from '@/styles/components/Register/RegisterRyokan';
import RegisterLeftSideInformation from '../RegisterLeftSideProcedureInformation/RegisterLeftSideInformation';
import RegisterFooter from '../RegisterFooter/RegisterFooter';

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
  const modalState = useSelector((selector) => selector.modalState.modalState);
  return (
    <RegisterRyokanStyle>
      <div
        className={`${
          modalState ? 'filter blur' : ''
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
