import React, { useEffect, useState } from 'react';
import RegisterRyokanStyle from '../../../styles/components/Register/RegisterRyokan';
import RegisterLeftSideInformation from '../RegisterLeftSideProcedureInformation/RegisterLeftSideInformation';
import RegisterFooter from '../RegisterFooter/RegisterFooter';

interface IPorps {
  producerText: string;
  priviousHref: string;
  nextHref: string;
}

const RegisterRyokan: React.FC<IPorps> = ({
  producerText,
  priviousHref,
  nextHref,
  children,
}) => {
  return (
    <RegisterRyokanStyle>
      <div className="grid grid-cols-2 h-full">
        <RegisterLeftSideInformation proceduerText={producerText} />
        {children}
        <RegisterFooter nextHref={nextHref} previousHref={priviousHref} />
      </div>
    </RegisterRyokanStyle>
  );
};

export default RegisterRyokan;
