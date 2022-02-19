import Image from 'next/image';
import React, { useCallback, useRef, useState } from 'react';
import { v4 } from 'uuid';
import {
  amenitiesType,
  photoType,
} from '@/types/reduxActionTypes/ReduxRegiserRyokanType';
import Amenities from '@/lib/staticData/Amenities';
import { RyokanType } from '@/lib/staticData/RegisterRyokanType';

interface IProps {
  ryokanType: string;
  title: string;
  imageUrls: photoType[];
  personnel: number;
  bedroomCount: number;
  bedsCount: number;
  bathroomCount: number;
  ryokanAmenities: amenitiesType;
  pricePerDay: string;
}

const SearchItem = React.forwardRef<any, IProps>(
  (
    {
      ryokanType,
      title,
      imageUrls,
      personnel,
      bedroomCount,
      bedsCount,
      bathroomCount,
      ryokanAmenities,
      pricePerDay,
    },
    ref
  ) => {
    const [visiableImage, setVisiableImage] = useState(0);

    const clickPreviousImageButton = useCallback(() => {
      if (visiableImage === 0) setVisiableImage(imageUrls.length - 1);
      if (visiableImage !== 0)
        setVisiableImage((previousImageNumber) => --previousImageNumber);
    }, [visiableImage]);
    const clickNextImageButton = useCallback(() => {
      if (visiableImage === imageUrls.length - 1) setVisiableImage(0);
      if (visiableImage !== imageUrls.length - 1)
        setVisiableImage((previousImageNumber) => ++previousImageNumber);
    }, [visiableImage]);

    const getTruthyAmenities = (amenities: amenitiesType) =>
      (Object.keys(amenities) as Array<keyof amenitiesType>)
        .map((amenityKey) => {
          if (ryokanAmenities[amenityKey]) return Amenities[amenityKey];
        })
        .filter((result) => result !== undefined);

    return (
      <div
        className="w-full text-black border rounded-2xl flex relative"
        ref={ref}
      >
        <div className="w-300 h-300 absolute flex">
          {imageUrls.map((image, index) => (
            <div
              key={v4()}
              className={`w-300 h-300 relative ${
                visiableImage === index ? 'block' : 'hidden'
              }`}
            >
              <Image
                className="rounded-xl"
                src={image.photoUrl}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          ))}
        </div>
        <div className="w-300 h-300 relative">
          <button
            className="w-10 h-10 absolute top-32 left-3 rounded-full bg-emerald text-white border-emerald border focus:outline-none"
            onClick={clickPreviousImageButton}
          >
            &lt;
            <span className="hidden">Previous</span>
          </button>
          <button
            className="w-10 h-10 absolute top-32 right-3 rounded-full bg-emerald text-white border-emerald border focus:outline-none"
            onClick={clickNextImageButton}
          >
            &gt;
            <span className="hidden">Next</span>
          </button>
        </div>
        <div className="w-400 divide-solid divide-y divide-gray-300 flex flex-col justify-center px-10">
          <div className="w-full py-3">
            <span className="text-xl">
              료칸 유형 : {RyokanType[ryokanType]}
            </span>
          </div>
          <div className="w-full py-3">
            <span className="inline-block w-full text-3xl truncate">
              {title}
            </span>
          </div>
          <div className="w-full space-x-2 py-3">
            <span>최대인원 {personnel}명</span>
            <span>침실수 {bedroomCount}개</span>
            <span>침대/침구 수 {bedsCount}개</span>
            <span>욕실 {bathroomCount}개</span>
          </div>
          <div className="w-full py-3">
            <span data-testid="ryokan-amenities">
              {getTruthyAmenities(ryokanAmenities).join(', ')}
            </span>
            <span className="block text-right text-xl text-green-600">
              ₩{pricePerDay} / 1박
            </span>
          </div>
        </div>
      </div>
    );
  }
);

export default React.memo(SearchItem);
