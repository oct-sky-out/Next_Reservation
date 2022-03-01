import { useState } from 'react';
import { useSelector } from '@/store/index';
import axios from '@/lib/api';
import Swal from 'sweetalert2';

const AccountChangePassword = () => {
  const token = useSelector((state) => state.user.data.token);
  const [newPassword, setNewPassword] = useState('');
  const [checkerPassword, setcheckerPassword] = useState('');
  const isSamePassword = () => newPassword === checkerPassword;
  const isNotEmptyPassword = () => newPassword && checkerPassword;
  const clickPasswordChangeButton = async () => {
    try {
      if (!isSamePassword() || !isNotEmptyPassword())
        Swal.fire({
          toast: true,
          title: '비밀번호 변경실패',
          text: '새로운 비밀번호란이 비어있거나 두 비밀번호가같은지 확인해주세요.',
          icon: 'info',
          position: 'top-end',
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: false,
          showCloseButton: true,
        });
      if (isSamePassword() && isNotEmptyPassword()) {
        await axios.post('/api/auth/changePassword', {
          password: newPassword,
          token,
        });
        Swal.fire({
          toast: true,
          title: '비밀번호 변경완료',
          text: '비밀번호변경을 완료했습니다.',
          icon: 'success',
          position: 'top-end',
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: false,
          showCloseButton: true,
        });
        setNewPassword('');
        setcheckerPassword('');
      }
    } catch {
      Swal.fire({
        toast: true,
        title: '비밀번호 변경실패',
        text: '비밀번호변경에 실패했습니다.',
        icon: 'error',
        position: 'top-end',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true,
      });
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center space-y-5">
        <div>
          <h3 className="text-2xl">비밀번호 변경</h3>
        </div>
        <div className="w-1/3">
          <h4 className="text-xl">새로운 비밀번호</h4>
          <input
            type="password"
            className="w-full border-b-2 border-solid border-emerald text-green-600 p-1 text-xl text-align"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="w-1/3">
          <h4 className="text-xl">비밀번호 확인</h4>
          <input
            type="password"
            className="w-full border-b-2 border-solid border-emerald text-green-600 p-1 text-xl text-align"
            value={checkerPassword}
            onChange={(e) => setcheckerPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            className="rounded-full p-3 w-48 bg-green-600 text-white"
            onClick={clickPasswordChangeButton}
          >
            비밀번호 변경
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountChangePassword;
