import Image from 'next/image';
import { photoType } from '@/types/reduxActionTypes/ReduxRegiserRyokanType';
import { useMemo } from 'react';

interface ISearchItemImage {
  itemImage: photoType;
}
const SearchItemImage: React.FC<ISearchItemImage> = ({ itemImage }) => {
  return (
    <>
      <img
        className="rounded-xl w-full h-full object-cover object-center"
        src={itemImage.photoUrl}
        loading="lazy"
      />
    </>
  );
};

export default SearchItemImage;
