import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { FiPaperclip } from 'react-icons/fi';
import { registerRyokanActions } from '@/store/registerRyokan';

const RegisterRyokanPhotos = () => {
  const dispatch = useDispatch();
  const photos = useSelector((seletor) => seletor.registerRyokan.photos);

  const fileUploaded = ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files && files.length !== 0) {
      const formData = new FormData();
      formData.append('file', files[0]);
      dispatch(registerRyokanActions.uploadPhotoStart(formData));
    }
  };

  return (
    <div className="w-full h-outOfHeader col-start-2 register-form animate-fadeInAndUpForm space-y-5 mx-0 my-auto overflow-auto">
      <div className="w-3/4 h-1/2 mx-auto my-5">
        <div className="w-full h-full relative border-dashed border-5 border-emerald rounded-lg flex justify-center items-center">
          <input
            type="file"
            accept="image/*"
            className="w-full h-full absolute cursor-pointer opacity-0"
            name="ryokan-photo"
            onChange={fileUploaded}
          />
          <button className="w-48 h-10 p-2 mb-3 rounded border-2 border-emerald flex justify-around items-center text-emerald">
            <FiPaperclip /> 파일을 선택하세요!
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterRyokanPhotos;