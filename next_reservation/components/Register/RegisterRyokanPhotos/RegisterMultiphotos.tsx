import React, { useEffect } from 'react';
import { useSelector } from '@/store/index';
import { FiPaperclip } from 'react-icons/fi';
import L from 'lodash';
import { v4 } from 'uuid';

interface IProps {
  fileUploaded: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RegisterMultiphotos: React.FC<IProps> = ({ fileUploaded }) => {
  let photos = useSelector((seletor) => seletor.registerRyokan.photos);

  return (
    <div className="w-full h-full relative flex flex-wrap items-center space-y-5">
      {L.chain(photos || [])
        .map((photoURL, index) => {
          if (index === 0) {
            return (
              <div
                key={v4()}
                className="w-full h-1/2 mb-3 relative basis-full border-solid border-5 border-emerald rounded-lg"
              >
                <img
                  src={photoURL}
                  loading="lazy"
                  alt="ryokan-register-photo"
                  className="w-full h-full absolute object-cover"
                />
              </div>
            );
          }
          {
            if (index !== 0) {
              return (
                <div
                  key={v4()}
                  className="w-pictureCard mx-2 h-1/3 relative bottom-5 border-solid border-5 border-emerald rounded-lg"
                >
                  <img
                    src={photoURL}
                    loading="lazy"
                    alt="ryokan-register-photo"
                    className="w-full h-full absolute object-cover"
                  />
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
    </div>
  );
};

export default RegisterMultiphotos;
