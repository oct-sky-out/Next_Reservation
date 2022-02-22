import { useSelector } from '@/store/index';
import { useEffect, useState } from 'react';

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
  }, []);

  useEffect(() => {
    if (isPhotoAvailable()) setSelectedPhoto(photos[photoOrder].photoUrl);
  }, [photoOrder]);

  return (
    <div>
      <div>
        {selectedPhoto ? (
          <img src={selectedPhoto} />
        ) : (
          <div>
            <h1>등록된 사진이 없습니다.</h1>
          </div>
        )}
        <div>
          <button
            onClick={clickPreviousOrder}
            disabled={setButtonDisabledState()}
          >
            &lt;
          </button>
        </div>
        <div>
          <button onClick={clickNextOrder} disabled={setButtonDisabledState()}>
            &lgt;
          </button>
        </div>
      </div>
      <div>
        {photos.length ? (
          photos.map((photo) => (
            <div>
              <img src={photo.photoUrl} alt={photo.photoName} />
            </div>
          ))
        ) : (
          <div>
            <h1>등록된 사진이 없습니다.</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default RyokanDetailImage;
