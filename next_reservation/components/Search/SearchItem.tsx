import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import findTruthyAmenities from '@/lib/utils/findTruthyAmenities';
import { RyokanType } from '@/lib/staticData/RegisterRyokanType';
import { RyokanSearchResultType } from '@/types/reduxActionTypes/ReduxSearchResultsRyokans';
import SearchItemImage from './SearchItemImage';

interface IProps {
  ryokanDetail: RyokanSearchResultType;
}

const SearchItem = React.forwardRef<any, IProps>(({ ryokanDetail }, ref) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    ryokanType,
    title,
    photos,
    bedrooms,
    bathrooms,
    amenities,
    pricePerDay,
  } = ryokanDetail;
  const [visiableImage, setVisiableImage] = useState(0);

  const clickPreviousImageButton = useCallback(() => {
    if (visiableImage === 0) setVisiableImage(photos.length - 1);
    if (visiableImage !== 0)
      setVisiableImage((previousImageNumber) => --previousImageNumber);
  }, [visiableImage]);
  const clickNextImageButton = useCallback(() => {
    if (visiableImage === photos.length - 1) setVisiableImage(0);
    if (visiableImage !== photos.length - 1)
      setVisiableImage((previousImageNumber) => ++previousImageNumber);
  }, [visiableImage]);

  const moveRyokanDetailPage = () => {
    router.push(`/room/${title}`);
  };

  return (
    <div
      className="w-full text-black border rounded-2xl flex relative"
      ref={ref}
    >
      <div className="w-300 h-300 absolute flex">
        {photos.map((image, index) => (
          <div
            key={v4()}
            className={`w-300 h-300 relative ${
              visiableImage === index ? 'block' : 'hidden'
            }`}
          >
            <SearchItemImage itemImage={image} />
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
          <span className="text-xl">?????? ?????? : {RyokanType[ryokanType]}</span>
        </div>
        <div className="w-full py-3">
          <span
            className="inline-block w-full text-3xl truncate cursor-pointer"
            onClick={moveRyokanDetailPage}
          >
            {title}
          </span>
        </div>
        <div className="w-full space-x-2 py-3">
          <span>???????????? {bedrooms.personnel}???</span>
          <span>????????? {bedrooms.bedroomCount}???</span>
          <span>??????/?????? ??? {Object.keys(bedrooms.bedroomList).length}???</span>
          <span>?????? {bathrooms.bathCount}???</span>
        </div>
        <div className="w-full py-3">
          <span data-testid="ryokan-amenities">
            {findTruthyAmenities(amenities)}
          </span>
          <span className="block text-right text-xl text-green-600">
            ???{pricePerDay} / 1???
          </span>
        </div>
      </div>
    </div>
  );
});

export default React.memo(SearchItem);
