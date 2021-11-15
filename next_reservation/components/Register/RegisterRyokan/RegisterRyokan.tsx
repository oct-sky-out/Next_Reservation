import React, { useEffect, useState } from 'react';
import RegisterRyokanStyle from '../../../styles/components/Register/RegisterRyokan';
import RegisterLeftSideInformation from '../RegisterLeftSideProcedureInformation/RegisterLeftSideInformation';
import RegisterFooter from '../RegisterFooter/RegisterFooter';

interface IPorps {
  priviousHref: string;
  nextHref: string;
}

const RegisterRyokan: React.FC<IPorps> = ({
  priviousHref,
  nextHref,
  children,
}) => {
  return (
    <RegisterRyokanStyle>
      <div className="grid grid-cols-2 h-full">
        <RegisterLeftSideInformation proceduerText="호스팅 할 료칸유형을 선택해주세요." />
        {children}
        <RegisterFooter nextHref={nextHref} previousHref={priviousHref} />
      </div>
    </RegisterRyokanStyle>
  );
};

export default RegisterRyokan;
