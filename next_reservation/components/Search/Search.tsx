import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { searchResultsRoomsActions } from '@/store/searchResultsRyokans';
import axios from '@/lib/api';
import { IRyokanType } from '@/types/reduxActionTypes/ReduxRegiserRyokanType';
import SearchItem from './SearchItem';
import { v4 } from 'uuid';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import SearchFilter from './SearchFilter';

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
        ryokanType: searchRoomFilter.filter.filterRyokanType,
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
    <>
      <div className={`${modalState ? 'filter blur-sm' : ''} `}>
        <SearchFilter className="text-black flex items-center mx-10 my-1 divide-solid divide-x divide-gray-300 " />
      </div>
      <div ref={itemRootRef}>
        {ryokanList.map(
          ({ amenities, bathrooms, bedrooms, ryokanType, title }, index) =>
            index === ryokanList.length - 1 ? (
              <SearchItem
                bathroomCount={bathrooms.bathCount}
                bedroomCount={bedrooms.bedroomCount}
                bedsCount={Object.keys(bedrooms.bedroomList).length}
                personnel={bedrooms.personnel}
                ryokanAmenities={amenities}
                ryokanType={ryokanType}
                title={title}
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
                title={title}
                key={v4()}
              />
            )
        )}
      </div>
      <div>{/* 지도 */}</div>
    </>
  );
};

export default Search;
