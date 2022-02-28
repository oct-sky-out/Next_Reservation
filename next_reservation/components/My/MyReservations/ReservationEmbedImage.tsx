import { photoType } from '@/types/reduxActionTypes/ReduxRegiserRyokanType';
import React from 'react';

interface IReservationEmbedImage {
  photo: photoType;
}

const ReservationEmbedImage: React.FC<IReservationEmbedImage> = ({ photo }) => {
  return (
    <>
      <img src={photo.photoUrl} alt={photo.photoName} loading="lazy" />
    </>
  );
};

export default ReservationEmbedImage;
