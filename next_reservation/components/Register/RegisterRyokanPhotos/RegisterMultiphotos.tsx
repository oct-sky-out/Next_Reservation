import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { registerRyokanActions } from '@/store/registerRyokan';
import L from 'lodash';
import { FiPaperclip } from 'react-icons/fi';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { RiDeleteBinFill } from 'react-icons/ri';
import { v4 } from 'uuid';
import MultiPhotosStyles from '@/styles/components/Register/RegisterMultiPhotos';

interface IProps {
  fileUploaded: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RegisterMultiphotos: React.FC<IProps> = ({ fileUploaded }) => {
  const dispatch = useDispatch();
  const photos = useSelector((seletor) => seletor.registerRyokan.photos);

  const photoDelete = (photoName: string) =>
    dispatch(registerRyokanActions.deletePhoto(photoName));

  const photoModify = (photoName: string, photoNo: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length !== 0) {
        const formData = new FormData();
        formData.append('file', target.files[0]);
        dispatch(
          registerRyokanActions.modifyPhoto({ formData, photoName, photoNo })
        );
      }
    };
    input.click();
  };

  return (
    <MultiPhotosStyles className="w-full h-full relative flex flex-wrap items-center space-y-5">
      {L.chain(photos || [])
        .map((photoObj, index) => {
          if (index === 0) {
            return (
              <div
                key={v4()}
                className="photo-wrapper w-full h-1/2 mb-3 relative basis-full border-solid border-5 border-emerald rounded-lg"
              >
                <img
                  src={photoObj.photoUrl}
                  loading="lazy"
                  alt="ryokan-register-photo"
                  className="w-full h-full absolute object-cover"
                />
                <div className="photo-modify-button w-32 h-16">
                  <button
                    className="w-16 h-16 border-5 border-emerald rounded-full text-black absolute right-4 bottom-3 flex justify-center items-center"
                    title="사진 수정"
                    onClick={(e) => {
                      photoModify(photoObj.photoName, index);
                    }}
                  >
                    <MdDriveFileRenameOutline color="#48cfae" size="32" />
                  </button>
                  <button
                    className="w-16 h-16 border-5 border-emerald rounded-full text-black absolute right-24 bottom-3 flex justify-center items-center"
                    title="사진 삭제"
                    onClick={() => photoDelete(photoObj.photoName)}
                  >
                    <RiDeleteBinFill color="#48cfae" size="32" />
                  </button>
                </div>
              </div>
            );
          }
          {
            if (index !== 0) {
              return (
                <div
                  key={v4()}
                  className="w-pictureCard mx-2 h-1/3 relative bottom-5 border-solid border-5 border-emerald rounded-lg photo-wrapper"
                >
                  <img
                    src={photoObj.photoUrl}
                    loading="lazy"
                    alt="ryokan-register-photo"
                    className="w-full h-full absolute object-cover "
                  />
                  <div className="photo-modify-button w-16 h-8">
                    <button
                      className="w-8 h-8 border-3 border-emerald rounded-full text-black absolute right-4 bottom-3 flex justify-center items-center"
                      title="사진 수정"
                      onClick={(e) => {
                        photoModify(photoObj.photoName, index);
                      }}
                    >
                      <MdDriveFileRenameOutline color="#48cfae" size="16" />
                    </button>
                    <button
                      className="w-8 h-8 border-3 border-emerald rounded-full text-black absolute right-14 bottom-3 flex justify-center items-center"
                      title="사진 삭제"
                      onClick={() => photoDelete(photoObj.photoName)}
                    >
                      <RiDeleteBinFill color="#48cfae" size="16" />
                    </button>
                  </div>
                </div>
              );
            }
          }
        })
        .value()}
      {!L.isEmpty(photos) && (
        <div className="w-pictureCard h-1/3 relative bottom-5 border-dashed border-5 border-emerald rounded-lg flex justify-center items-center">
          <input
            type="file"
            accept="image/*"
            className="w-full h-full absolute cursor-pointer opacity-0"
            name="ryokan-photo"
            onChange={fileUploaded}
          />
          <button className="w-30 h-10 p-2 mb-3 rounded border-2 border-emerald flex justify-around items-center text-emerald">
            <FiPaperclip /> 파일을 선택하세요!
          </button>
        </div>
      )}
    </MultiPhotosStyles>
  );
};

export default RegisterMultiphotos;
