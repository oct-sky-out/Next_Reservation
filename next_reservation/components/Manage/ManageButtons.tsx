import axios from '@/lib/api';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { RyokanManageType } from '@/types/apiTyps/ryokan/RyokanManage';
import { useDispatch } from 'react-redux';
import { ryokanFormActions } from '@/store/ryokanForm';

interface IManageButtons {
  ryokanId: string;
  ryokan: RyokanManageType;
}

const ManageButtons: React.FC<IManageButtons> = ({ ryokanId, ryokan }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const ryokanEdit = () => {
    const { ryokanId, ryokanManager, ...ryokanForm } = ryokan;
    dispatch(
      ryokanFormActions.setRyokanForm({
        ...ryokanForm,
        option: { isEdit: true, ryokanId },
      })
    );
    router.push(`/room/manage/${ryokanForm.title}/ryokan`);
  };
  const ryokanDelete = async () => {
    await axios.delete(`/api/ryokan/remove?ryokanId=${ryokanId}`);
    await Swal.fire({
      icon: 'success',
      title: '료칸 삭제완료.',
      text: '료칸삭제가 완료되었습니다.',
      confirmButtonText: '확인',
    });
    router.reload();
  };
  return (
    <div className="space-x-3 text-white absolute right-0 bottom-0">
      <button
        className="w-36 px-3 py-2 rounded-full border-solid border-2 border-emerald bg-emerald"
        onClick={ryokanEdit}
      >
        정보수정
      </button>
      <button
        className="w-36 px-3 py-2 rounded-full border-solid border-2 border-red-400 bg-red-400"
        onClick={ryokanDelete}
      >
        삭제
      </button>
    </div>
  );
};

export default ManageButtons;
