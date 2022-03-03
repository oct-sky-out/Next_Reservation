import { useRouter } from 'next/router';
import nookies from 'nookies';
import axios from '@/lib/api';
import Swal from 'sweetalert2';

const AccountDeleteButton = () => {
  const router = useRouter();
  const clickDeleteAccount = async () => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: '정말로 탈퇴하시겠습니까?',
        icon: 'warning',
        position: 'center',
        confirmButtonText: '탈퇴',
        confirmButtonColor: '#ce3626',
        showCancelButton: true,
        cancelButtonText: '취소',
      });
      if (isConfirmed) {
        await axios.delete('/api/auth/deleteAccount');
        Swal.fire({
          toast: true,
          title: '탈퇴완료',
          text: '탈퇴를 완료했습니다.',
          icon: 'success',
          position: 'top-end',
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: false,
          showCloseButton: true,
        });
        nookies.destroy(null, 'access_token');
        router.push('/');
      }
    } catch {
      Swal.fire({
        toast: true,
        title: '회원탈퇴 실패',
        text: '회원탈퇴에 실패했습니다. 죄송합니다.',
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
    <div className="flex flex-col items-center space-y-5">
      <h3 className="text-2xl">회원탈퇴를 원하시면 회원탈퇴를 누르세요.</h3>
      <button
        className="rounded-full p-3 w-48 bg-red-500 text-white"
        onClick={clickDeleteAccount}
      >
        회원탈퇴
      </button>
    </div>
  );
};

export default AccountDeleteButton;
