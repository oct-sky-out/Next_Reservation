import useGetAccountPictureName from '@/components/hooks/useGetAccountPictureName';
import { userSignInAndUpActions } from '@/store/userSignInAndUp';
import { useDispatch } from 'react-redux';

interface IChangeImageButton {
  imageSrc: string;
}

const ChangeImageButton: React.FC<IChangeImageButton> = ({ imageSrc }) => {
  const dispatch = useDispatch();
  const uploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imageName = useGetAccountPictureName(imageSrc);
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      dispatch(
        userSignInAndUpActions.modifyUserPicture({
          photoName: imageName,
          fileBuffer: formData,
        })
      );
    }
  };
  return (
    <>
      <label className="rounded-full p-3 w-48 bg-green-600 text-white cursor-pointer text-center">
        사진변경
        <input
          type="file"
          className="hidden "
          formTarget=""
          accept="image/*"
          onChange={uploadChange}
        />
      </label>
    </>
  );
};

export default ChangeImageButton;
