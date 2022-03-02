import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from '@/store/index';
import axios from '@/lib/api';
import Loader from 'react-loader-spinner';
import Swal from 'sweetalert2';

const RegisterCompletion = () => {
  const router = useRouter();
  const { registerInfo, email } = useSelector((selector) => ({
    registerInfo: selector.registerRyokan,
    email: selector.user.data.email,
  }));

  const [fetchedResult, setFetchedResultDom] = useState<boolean>(false);
  const [registerResultJSX, setRegisterResultJSX] = useState<JSX.Element>(
    <></>
  );
  const goToHomepage = () => {
    router.push('/');
  };

  const registerResult = useCallback(
    (isCompletion) => () => {
      return (
        <div className="text-2xl space-y-5">
          <span className="block">
            {isCompletion
              ? '성공적으로 등록하였습니다!'
              : '등록에 실패하였습니다.'}
          </span>
          <button
            type="button"
            className="rounded-full py-3 px-6 border-4 border-emerald  "
          >
            <div
              className=" w-full h-full flex justify-center items-center"
              onClick={goToHomepage}
            >
              홈으로 돌아가기
            </div>
          </button>
        </div>
      );
    },
    []
  );

  const fetchRegisterRyokan = async () => {
    try {
      await axios.post('/api/ryokan/register', {
        email,
        registerData: registerInfo,
      });
      setRegisterResultJSX(registerResult(true));
    } catch {
      await Swal.fire({
        title: '등록에 실패하였습니다.',
        text: '네트워크 상태나 로그인 정보 그리고 료칸등록 정보를 확인해주세요.',
      });
      setRegisterResultJSX(registerResult(false));
    } finally {
      setFetchedResultDom(true);
    }
  };

  useEffect(() => {
    fetchRegisterRyokan();
    if (localStorage.getItem('savedRegisterRyokanData'))
      localStorage.removeItem('savedRegisterRyokanData');
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-400 h-400 text-black text-center space-y-5">
        {fetchedResult ? (
          registerResultJSX
        ) : (
          <>
            <div className="text-2xl">료칸을 등록하는 중입니다...</div>
            <div className="w-100px mx-auto">
              <Loader type="Oval" color="#48cfae" height="100" width="100" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterCompletion;
