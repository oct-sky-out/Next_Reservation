import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';
import { useSelector } from '@/store/index';
import RegisterFooterStyle from '@/styles/components/Register/RegisterFooter';

interface IProps {
  previousHref: string;
  nextHref: string;
  step: number;
}

const RegisterFooter: React.FC<IProps> = ({ nextHref, previousHref, step }) => {
  const router = useRouter();
  const isValid = useSelector((selector) => selector.registerIsValid.isValid);

  return (
    <RegisterFooterStyle
      step={step}
      className="w-full p-10 bg-white sticky flex items-center justify-between"
    >
      <div className="step-line bg-emerald text-emerald flex justify-end">
        <span className="mt-2 mr-3  ">{step}단계</span>
      </div>
      <Link href={previousHref} passHref>
        <button className="btn btn-primary back-page-btn">
          <a>뒤로</a>
        </button>
      </Link>
      <Link href={nextHref} passHref>
        <button className="btn btn-primary next-page-btn" disabled={!isValid}>
          <a>
            {router.pathname === '/room/register/pricePerDay' ? '등록' : '다음'}
          </a>
        </button>
      </Link>
    </RegisterFooterStyle>
  );
};

export default RegisterFooter;
