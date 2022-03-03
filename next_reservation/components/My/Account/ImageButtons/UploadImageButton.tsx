import { userSignInAndUpActions } from '@/store/userSignInAndUp';
import { useDispatch } from 'react-redux';

const UploadImageButton = () => {
  const dispatch = useDispatch();
  const uploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      dispatch(userSignInAndUpActions.uploadUserPicture(formData));
    }
  };
  return (
    <>
      <label className="rounded-full p-3 w-48 bg-green-600 text-white cursor-pointer text-center">
        사진등록
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

export default UploadImageButton;
