import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from '@/store/index';
import axios from '@/lib/api';
import { v4 } from 'uuid';
import Loader from 'react-loader-spinner';
import SearchItem from './SearchItem';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import SearchFilter from './SearchFilter';
import { IRyokanType } from '@/types/reduxActionTypes/ReduxRegiserRyokanType';

const Search = () => {
  //* redux
  const { modalState, searchRoom, searchRoomFilter } = useSelector((state) => ({
    modalState: state.modalState.modalState,
    searchRoom: state.searchRoom,
    searchRoomFilter: state.searchResultRyokan,
  }));

  //* useStates
  const [documentStart, setDocumentStart] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [ryokanList, setRyokanList] = useState<IRyokanType[]>([]);

  //* useRefs
  const itemRootRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  //* constant varialble
  const NEXT_DOCUMENT_PAGING_LIMIT = 20;

  //*useCallback
  const fetchSearchCondition = useCallback(async () => {
    setLoadingStatus(true);
    const { data } = await axios.get<IRyokanType[]>('/api/search', {
      params: {
        documentStart,
        latitude: searchRoom.latitude,
        longitude: searchRoom.longitude,
        checkInDate: searchRoom.checkInDate,
        checkOutDate: searchRoom.checkOutDate,
        adultCount: searchRoom.adultCount,
        childrenCount: searchRoom.childrenCount,
        infantsCount: searchRoom.infantsCount,
        convenienceSpaces: searchRoomFilter.filter.filterConvenienceSpaces,
        priceMin: searchRoomFilter.filter.filterPricePerDay.min,
        priceMax: searchRoomFilter.filter.filterPricePerDay.max,
        ryokanType: searchRoomFilter.filter.filterRyokanType || null,
      },
    });
    if (data.length) {
      setDocumentStart(
        (previousStart) => previousStart + NEXT_DOCUMENT_PAGING_LIMIT
      );
      setRyokanList((previousList) => [...previousList, ...data]);
    }
    setLoadingStatus(false);
  }, [searchRoom, searchRoomFilter, documentStart]);

  useEffect(() => {
    fetchSearchCondition();
  }, []);
  //* custom hook
  useIntersectionObserver({
    rootElement: itemRootRef.current,
    targetElement: itemRef.current,
    onIntersection: ([{ isIntersecting }]) => {
      if (isIntersecting && !loadingStatus) {
        fetchSearchCondition();
      }
    },
    threshold: 0.5,
  });

  return (
    <div className={`${modalState ? 'filter blur-sm' : ''} `}>
      <div>
        <SearchFilter className="text-black flex items-center mx-10 my-1 divide-solid divide-x divide-gray-300 " />
      </div>
      <div>
        <div ref={itemRootRef} className="mt-5">
          {ryokanList.map(
            (
              { amenities, bathrooms, bedrooms, ryokanType, title, photos },
              index
            ) =>
              index === ryokanList.length - 1 ? (
                <SearchItem
                  bathroomCount={bathrooms.bathCount}
                  bedroomCount={bedrooms.bedroomCount}
                  bedsCount={Object.keys(bedrooms.bedroomList).length}
                  personnel={bedrooms.personnel}
                  ryokanAmenities={amenities}
                  ryokanType={ryokanType}
                  title={title}
                  imageUrls={photos}
                  key={v4()}
                  ref={itemRef}
                />
              ) : (
                <SearchItem
                  bathroomCount={bathrooms.bathCount}
                  bedroomCount={bedrooms.bedroomCount}
                  bedsCount={Object.keys(bedrooms.bedroomList).length}
                  personnel={bedrooms.personnel}
                  ryokanAmenities={amenities}
                  ryokanType={ryokanType}
                  imageUrls={photos}
                  title={title}
                  key={v4()}
                />
              )
          )}
          {loadingStatus && <Loader type="Oval" color="#48cfae" />}
        </div>
        <div>{/* 지도*/}</div>
      </div>
    </div>
  );
};

export default Search;
