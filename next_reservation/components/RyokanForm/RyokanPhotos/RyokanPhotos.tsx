import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { FiPaperclip } from 'react-icons/fi';
import L from 'lodash';
import { ryokanFormActions } from '@/store/ryokanForm';
import { registerFormValidAction } from '@/store/registerFormIsValid';
import RegisterMultiphotos from './RegisterMultiphotos';

const RegisterRyokanPhotos = () => {
  const dispatch = useDispatch();
  const photos = useSelector((seletor) => seletor.ryokanForm.photos);

  const fileUploaded = ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files && files.length !== 0) {
      const formData = new FormData();
      formData.append('file', files[0]);
      dispatch(ryokanFormActions.uploadPhotoStart(formData));
    }
  };

  useEffect(() => {
    if (L.isEmpty(photos)) dispatch(registerFormValidAction.setValid(false));
    if (!L.isEmpty(photos)) dispatch(registerFormValidAction.setValid(true));
  }, [photos]);

  return (
    <div className="w-full h-outOfHeader col-start-2 register-form animate-fadeInAndUpForm space-y-5 mx-0 my-auto overflow-auto">
      <div className="w-3/4 h-3/4 mx-auto my-5">
        {L.isEmpty(photos) && (
          <div className="w-full h-full relative border-dashed border-5 border-emerald rounded-lg flex justify-center items-center">
            <input
              type="file"
              accept="image/*"
              className="w-full h-full absolute cursor-pointer opacity-0"
              name="ryokan-photo"
              data-testid="file-input"
              onChange={fileUploaded}
            />
            <button
              className="w-48 h-10 p-2 mb-3 rounded border-2 border-emerald flex justify-around items-center text-emerald"
              data-testid="select-photo"
            >
              <FiPaperclip /> 파일을 선택하세요!
            </button>
          </div>
        )}
        {photos.length !== 0 && (
          <RegisterMultiphotos fileUploaded={fileUploaded} />
        )}
      </div>
    </div>
  );
};

export default RegisterRyokanPhotos;
