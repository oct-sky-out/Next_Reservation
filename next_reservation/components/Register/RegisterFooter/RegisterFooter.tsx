import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from '../../../store';
import RegisterFooterStyle from '../../../styles/components/Register/RegisterFooter';

interface IProps {
  previousHref: string;
  nextHref: string;
}

const RegisterFooter: React.FC<IProps> = ({ nextHref, previousHref }) => {
  const isValid = useSelector((selector) => selector.registerIsValid.isValid);

  return (
    <RegisterFooterStyle className="h-20 w-1/2 p-10 absolute left-1/2 bottom-10 flex items-center justify-between">
      <Link href={previousHref || ''} passHref>
        <button className="btn btn-primary">
          <a>뒤로</a>
        </button>
      </Link>
      <Link href={nextHref || ''} passHref>
        <button className="btn btn-primary" disabled={!isValid}>
          <a>다음</a>
        </button>
      </Link>
    </RegisterFooterStyle>
  );
};

export default RegisterFooter;
