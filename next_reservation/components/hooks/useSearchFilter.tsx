import {
  convenienceSpacesType,
  IRyokanType,
} from '@/types/reduxActionTypes/ReduxRegiserRyokanType';

type SearchRoomFilterType = {
  filterConvenienceSpaces: convenienceSpacesType;
  filterPricePerDay: {
    min: number;
    max: number;
  };
  filterRyokanType: string;
};

const useSearchFilter = (
  searchResult: IRyokanType[],
  searchRoomFilter: SearchRoomFilterType
) => {
  const ELIGIBLE = true;
  const UNELIGIBLE = false;

  const isPossibleConvenienceSpaceFiltering = () =>
    Object.values(searchRoomFilter.filterConvenienceSpaces).includes(true);

  const isPossibleMinPriceFiltering = () =>
    searchRoomFilter.filterPricePerDay.min !== 0;

  const isPossibleMaxPriceFiltering = () =>
    searchRoomFilter.filterPricePerDay.max !== 500000;

  const isPossibleRyokanTypeFiltering = () =>
    searchRoomFilter.filterRyokanType !== '';

  const filterConvenience = async () =>
    isPossibleConvenienceSpaceFiltering()
      ? searchResult.filter((ryokan) => {
          const convenienceKeys = Object.keys(
            searchRoomFilter.filterConvenienceSpaces
          ) as (keyof convenienceSpacesType)[];
          let filterStatus = ELIGIBLE;

          convenienceKeys.forEach((convenienceKey) => {
            if (searchRoomFilter.filterConvenienceSpaces[convenienceKey]) {
              if (!ryokan.convenienceSpaces[convenienceKey]) {
                return (filterStatus = UNELIGIBLE);
              }
              if (ryokan.convenienceSpaces[convenienceKey]) {
                filterStatus = ELIGIBLE;
              }
            }
          });
          return filterStatus;
        })
      : searchResult;

  const filterMinPrice = async () => {
    const filterResult = await filterConvenience();
    if (isPossibleMinPriceFiltering())
      return filterResult.filter(
        (ryokan) =>
          +ryokan.pricePerDay.replace(',', '') >=
          searchRoomFilter.filterPricePerDay.min
      );
    return filterResult;
  };

  const filterMaxPrice = async () => {
    const filterResult = await filterMinPrice();
    if (isPossibleMaxPriceFiltering())
      return filterResult.filter(
        (ryokan) =>
          +ryokan.pricePerDay.replace(',', '') <=
          searchRoomFilter.filterPricePerDay.max
      );
    return filterResult;
  };
  const filterRyokanType = async () => {
    const filterResult = await filterMaxPrice();
    if (isPossibleRyokanTypeFiltering())
      return filterResult.filter(
        (ryokan) => ryokan.ryokanType === searchRoomFilter.filterRyokanType
      );
    return filterResult;
  };

  return filterRyokanType;
};

export default useSearchFilter;
