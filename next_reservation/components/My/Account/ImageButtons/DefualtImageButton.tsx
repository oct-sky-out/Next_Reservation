import { useDispatch } from 'react-redux';
import { userSignInAndUpActions } from '@/store/userSignInAndUp';
import useGetAccountPictureName from '@/components/hooks/useGetAccountPictureName';

interface IDefualtImageButton {
  imageSrc: string;
}
const DefualtImageButton: React.FC<IDefualtImageButton> = ({ imageSrc }) => {
  const dispatch = useDispatch();

  const clickDefualtImageButton = () => {
    const imageName = useGetAccountPictureName(imageSrc);
    dispatch(userSignInAndUpActions.removeUserPicture(imageName));
  };
  return (
    <>
      <button
        className="rounded-full p-3 w-48 bg-green-600 text-white"
        onClick={clickDefualtImageButton}
      >
        기본사진으로 되돌리기
      </button>
    </>
  );
};

export default DefualtImageButton;
