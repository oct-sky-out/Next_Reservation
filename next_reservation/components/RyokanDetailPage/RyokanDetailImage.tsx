import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from '@/store/index';
import { v4 } from 'uuid';

const RyokanDetailImage = () => {
  const photos = useSelector((state) => state.ryokanDetail.photos);
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const [photoOrder, setPhotoOrder] = useState(0);

  const isPhotoAvailable = () => photos.length;
  const setButtonDisabledState = () => (isPhotoAvailable() ? false : true);
  const clickNextOrder = () => {
    if (photoOrder === photos.length - 1) setPhotoOrder(0);
    else setPhotoOrder((order) => ++order);
  };
  const clickPreviousOrder = () => {
    if (photoOrder === 0) setPhotoOrder(photos.length - 1);
    else setPhotoOrder((order) => --order);
  };

  useEffect(() => {
    if (isPhotoAvailable()) setSelectedPhoto(photos[0].photoUrl);
    else setSelectedPhoto('');
  }, [photos]);

  useEffect(() => {
    if (isPhotoAvailable()) setSelectedPhoto(photos[photoOrder].photoUrl);
  }, [photoOrder]);

  return (
    <>
      <div className="w-full h-4/5 relative">
        {selectedPhoto ? (
          <div className="w-full h-full relative">
            <Image
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              loading="lazy"
              src={selectedPhoto}
            />
          </div>
        ) : (
          <div>
            <h1>등록된 사진이 없습니다.</h1>
          </div>
        )}
        <div className="absolute left-10 bottom-1/2">
          <button
            className="text-5xl text-green-500"
            onClick={clickPreviousOrder}
            disabled={setButtonDisabledState()}
          >
            &lt;
          </button>
        </div>
        <div className="absolute right-10 bottom-1/2">
          <button
            className="text-5xl text-green-500"
            onClick={clickNextOrder}
            disabled={setButtonDisabledState()}
          >
            &gt;
          </button>
        </div>
      </div>
      <div className="flex w-full h-200 space-x-3 mt-3">
        {photos.length ? (
          photos.map((photo) => (
            <div className="w-200 relative" key={v4()}>
              <Image
                className="w-full h-full"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                src={photo.photoUrl}
                alt={photo.photoName}
              />
            </div>
          ))
        ) : (
          <div>
            <h1>등록된 사진이 없습니다.</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default RyokanDetailImage;
