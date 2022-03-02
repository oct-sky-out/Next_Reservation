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
  const ryokanForm = useSelector((selector) => selector.ryokanForm);

  const saveRegisterForm = () => {
    if (!router.pathname.includes('completion')) {
      localStorage.setItem(
        'savedRegisterRyokanData',
        JSON.stringify(ryokanForm)
      );
    }
  };

  const removeRegisterRyokanForm = () => {
    if (router.pathname.includes('completion')) {
      localStorage.removeItem('savedRegisterRyokanData');
    }
  };

  const clickNextPageButton = () => {
    saveRegisterForm();
    removeRegisterRyokanForm();
  };

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
        <button
          className="btn btn-primary next-page-btn"
          disabled={!isValid}
          onClick={clickNextPageButton}
        >
          <a>{router.pathname === '/room/register/date' ? '등록' : '다음'}</a>
        </button>
      </Link>
    </RegisterFooterStyle>
  );
};

export default RegisterFooter;
