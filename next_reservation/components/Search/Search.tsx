import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { searchResultsRoomsActions } from '@/store/searchResultsRyokans';
import axios from '@/lib/api';
import { v4 } from 'uuid';
import Loader from 'react-loader-spinner';
import SearchItem from './SearchItem';
import SearchFilter from './SearchFilter';
import SearchReslutLocation from './SearchReslutLocation';
import useSearchFilter from '../hooks/useSearchFilter';
import { IRyokanType } from '@/types/reduxActionTypes/ReduxRegiserRyokanType';
import { RyokanSearchResultType } from '@/types/reduxActionTypes/ReduxSearchResultsRyokans';

const Search = () => {
  //* redux
  const { modalState, searchRoom, searchRoomFilter, searchResult } =
    useSelector((state) => ({
      modalState: state.modalState.modalState,
      searchRoom: state.searchRoom,
      searchRoomFilter: state.searchResultRyokan.filter,
      searchResult: state.searchResultRyokan.searchResult,
    }));
  const dispatch = useDispatch();

  //* useStates
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isMaxLoaded, setIsMaxLoaded] = useState(false);
  const [offset, setOffset] = useState(0);
  const [filterRyokanList, setFilterRyokanList] = useState<
    RyokanSearchResultType[]
  >([]);
  const searchFilter = useSearchFilter(searchResult, searchRoomFilter);

  //* useRefs
  const itemRootRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  //* constant varialble
  const NEXT_DOCUMENT_PAGING_LIMIT = 10;
  const isFilter =
    searchRoomFilter.filterRyokanType ||
    searchRoomFilter.filterPricePerDay.min !== 0 ||
    searchRoomFilter.filterPricePerDay.max !== 500000 ||
    Object.values(searchRoomFilter.filterConvenienceSpaces).includes(true);

  //*useCallback
  const fetchSearch = useCallback(async () => {
    setLoadingStatus(true);
    const { data } = await axios.get<RyokanSearchResultType[]>('/api/search', {
      params: {
        documentStart: offset,
        latitude: searchRoom.latitude,
        longitude: searchRoom.longitude,
        checkInDate: searchRoom.checkInDate,
        checkOutDate: searchRoom.checkOutDate,
        adultCount: searchRoom.adultCount,
        childrenCount: searchRoom.childrenCount,
        infantsCount: searchRoom.infantsCount,
      },
    });
    if (data.length)
      dispatch(
        searchResultsRoomsActions.setSearchResult([...searchResult, ...data])
      );
    if (!data.length) setIsMaxLoaded(true);
    setLoadingStatus(false);
  }, [searchRoom, offset]);

  const observerNextPage = useCallback(() => {
    if (!itemRef.current) return;
    const observer = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        if (isIntersecting && !loadingStatus && !isMaxLoaded) {
          setOffset(
            (prevoiusOffset) => prevoiusOffset + NEXT_DOCUMENT_PAGING_LIMIT
          );
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(itemRef.current);
  }, [itemRef.current, loadingStatus, isMaxLoaded]);

  useEffect(() => {
    if (isFilter)
      searchFilter().then((filterResult) => setFilterRyokanList(filterResult));
  }, [searchRoomFilter, searchResult]);

  useEffect(() => {
    fetchSearch();
  }, [fetchSearch]);

  useEffect(() => {
    observerNextPage();
  }, [observerNextPage]);

  return (
    <div className={`${modalState ? 'filter blur-sm' : ''} `}>
      <div>
        <SearchFilter className="text-black flex items-center mx-10 my-1 divide-solid divide-x divide-gray-300 boarder-b-2 boarder-solid" />
      </div>
      <div className="w-full flex justify-center space-x-10 mt-5">
        <div className="w-800">
          <div ref={itemRootRef} className="px-5 space-y-5">
            {(isFilter ? filterRyokanList : searchResult).map(
              (ryokanDeail, index) =>
                index === searchResult.length - 1 ? (
                  <SearchItem
                    ryokanDetail={ryokanDeail}
                    key={v4()}
                    ref={itemRef}
                  />
                ) : (
                  <SearchItem ryokanDetail={ryokanDeail} key={v4()} />
                )
            )}
            {loadingStatus && (
              <div className="flex justify-center">
                <Loader type="Oval" color="#48cfae" />
              </div>
            )}
          </div>
        </div>
        <div className="w-1/2 h-screen relative">
          <div className="fixed top-56 w-1000 h-1000">
            <SearchReslutLocation
              markerInformations={(isFilter
                ? filterRyokanList
                : searchResult
              ).map((ryokan) => ({
                pricePerDay: ryokan.pricePerDay,
                latitude: ryokan.location.latitude,
                longitude: ryokan.location.longitude,
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
