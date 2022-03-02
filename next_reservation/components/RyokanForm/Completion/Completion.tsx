import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from '@/store/index';
import axios from '@/lib/api';
import Loader from 'react-loader-spinner';
import Swal from 'sweetalert2';

const RegisterCompletion = () => {
  const router = useRouter();
  const { ryokanForm, email } = useSelector((selector) => ({
    ryokanForm: selector.ryokanForm,
    email: selector.user.data.email,
  }));
  const { option, ...ryokan } = ryokanForm;

  const [fetchedResult, setFetchedResultDom] = useState<boolean>(false);
  const [registerResultJSX, setRegisterResultJSX] = useState<JSX.Element>(
    <></>
  );
  const goToHomepage = () => {
    router.push('/');
  };

  const goToRyokanManagePage = () => {
    router.push('/room/manage');
  };
  const clickMovePage = () => {
    if (option.isEdit) goToRyokanManagePage();
    goToHomepage();
  };
  const goPageMessage = () => {
    if (option.isEdit) return '료칸 관리페이지로 돌아가기';
    return '홈으로 돌아가기';
  };

  const completionMessage = () => {
    if (option.isEdit) return '성공적으로 수정하였습니다!';
    return '성공적으로 등록하였습니다!';
  };
  const incompletionMessage = () => {
    if (option.isEdit) return '수정에 실패하였습니다.';
    return '등록에 실패하였습니다.';
  };

  const getMessage = (isCompletion: boolean) =>
    isCompletion ? completionMessage() : incompletionMessage();

  const registerResult = useCallback(
    (isCompletion) => () => {
      return (
        <div className="text-2xl space-y-5">
          <span className="block">{getMessage(isCompletion)}</span>
          <button
            type="button"
            className="rounded-full py-3 px-6 border-4 border-emerald  "
          >
            <div
              className=" w-full h-full flex justify-center items-center"
              onClick={clickMovePage}
            >
              {goPageMessage()}
            </div>
          </button>
        </div>
      );
    },
    []
  );

  const registerRyokan = async () =>
    await axios.post('/api/ryokan/register', {
      email,
      registerData: ryokan,
    });

  const editRyokan = async () =>
    await axios.put('/api/ryokan/edit', {
      ryokanId: option.ryokanId,
      ryokan,
    });

  const fetchRegisterOrEditRyokan = async () => {
    try {
      if (option.isEdit) await editRyokan();
      if (!option.isEdit) await registerRyokan();
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
    fetchRegisterOrEditRyokan();
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
