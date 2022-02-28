import Image from 'next/image';
import { photoType } from '@/types/reduxActionTypes/ReduxRegiserRyokanType';
import { useMemo } from 'react';

interface ISearchItemImage {
  itemImage: photoType;
}
const SearchItemImage: React.FC<ISearchItemImage> = ({ itemImage }) => {
  return (
    <>
      <Image
        className="rounded-xl"
        src={itemImage.photoUrl}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        loading="lazy"
      />
    </>
  );
};

export default SearchItemImage;
