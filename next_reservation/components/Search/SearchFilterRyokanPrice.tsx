import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import { useSelector } from '@/store/index';
import MultipleRangeInput from '../common/MultipleRangeInput';
import { searchResultsRoomsActions } from '@/store/searchResultsRyokans';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';

interface IProps {
  priceFilterOpend: boolean;
  setPriceFilterOpend: Dispatch<SetStateAction<boolean>>;
}

const SearchFilterRyokanPrice: React.FC<IProps> = ({
  priceFilterOpend,
  setPriceFilterOpend,
}) => {
  const filterPricePerDay = useSelector(
    (state) => state.searchResultRyokan.filter.filterPricePerDay
  );
  const dispatch = useDispatch();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  //* useRefs
  const minPriceRef = useRef<HTMLInputElement>(null);
  const maxPriceRef = useRef<HTMLInputElement>(null);
  const minPriceSliderRef = useRef<HTMLDivElement>(null);
  const maxPriceSliderRef = useRef<HTMLDivElement>(null);

  //* debouncing Funcion
  const debounceMinPricePerDay = debounce((e) => {
    dispatch(
      searchResultsRoomsActions.setFilterMinPricePerDay(
        (+e.target.value / 100) * 500000
      )
    );
  }, 500);
  const debounceMaxPricePerDay = debounce((e) => {
    dispatch(
      searchResultsRoomsActions.setFilterMaxPricePerDay(
        (+e.target.value / 100) * 500000
      )
    );
  }, 500);

  //* useCallbacks
  const dispatchMinPricePerDay = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debounceMinPricePerDay(e);
    },
    []
  );
  const dispatchMaxPricePerDay = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debounceMaxPricePerDay(e);
    },
    []
  );

  const fiterMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(+e.target.value);
    dispatchMinPricePerDay(e);
  };
  const fiterMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(+e.target.value);
    dispatchMaxPricePerDay(e);
  };

  return (
    <div className="relatie mx-3">
      <button
        className="w-20 px-2 py-2 border rounded-full flex justify-center items-center text-emerald"
        onClick={() =>
          setPriceFilterOpend((previousOpenStatus) => !previousOpenStatus)
        }
      >
        요금 필터
      </button>
      {priceFilterOpend && (
        <div className="absolute flex flex-col space-y-5 justify-center items-center w-400 h-200 border rounded-lg mt-3 z-2 bg-white">
          <span>최소, 최대요금을 조절하여주세요.</span>
          <MultipleRangeInput
            maxRef={maxPriceRef}
            minRef={minPriceRef}
            maxValue={maxPrice}
            minValue={minPrice}
            maxThumbRef={maxPriceSliderRef}
            minThumbRef={minPriceSliderRef}
            maxValueOnChange={fiterMaxPrice}
            minValueOnChange={fiterMinPrice}
            maxValueDescription={filterPricePerDay.max?.toFixed(0) + '원'}
            minValueDescription={filterPricePerDay.min?.toFixed(0) + '원'}
            className="w-300 h-9"
          />
        </div>
      )}
    </div>
  );
};

export default SearchFilterRyokanPrice;
