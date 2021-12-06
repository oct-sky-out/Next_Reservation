import Link from 'next/link';
import React from 'react';
import { useSelector } from '../../../store';
import RegisterFooterStyle from '../../../styles/components/Register/RegisterFooter';

interface IProps {
  previousHref: string;
  nextHref: string;
}

const RegisterFooter: React.FC<IProps> = ({ nextHref, previousHref }) => {
  const isValid = useSelector((selector) => selector.registerIsValid.isValid);

  return (
    <RegisterFooterStyle className="w-full p-10 bg-white sticky flex items-center justify-between">
      <Link href={previousHref} passHref>
        <button className="btn btn-primary back-page-btn">
          <a>뒤로</a>
        </button>
      </Link>
      <Link href={nextHref} passHref>
        <button className="btn btn-primary next-page-btn" disabled={!isValid}>
          <a>다음</a>
        </button>
      </Link>
    </RegisterFooterStyle>
  );
};

export default RegisterFooter;
