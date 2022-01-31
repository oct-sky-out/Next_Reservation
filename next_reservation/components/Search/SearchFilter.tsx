import React, { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import Selector from '@/components/common/Selector';
import L from 'lodash';
import { v4 } from 'uuid';
import { RyokanType } from '@/lib/staticData/RegisterRyokanType';
import ConvenienceSpaces from '@/lib/staticData/ConvenienceSpaces';
import selectElementSelector from '@/lib/utils/selectElementSelector';
import { searchResultsRoomsActions } from '@/store/searchResultsRyokans';
import { convenienceSpacesType } from '@/types/reduxActionTypes/ReduxRegiserRyokanType';
import MultipleRangeInput from '../common/MultipleRangeInput';
import OutsideClickHandler from 'react-outside-click-handler';

const SearchFilter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  // * redux
  const dispatch = useDispatch();
  const { filterRyokanType, filterConvenienceSpaces, filterPricePerDay } =
    useSelector((state) => ({
      filterRyokanType: state.searchResultRyokan.filter.filterRyokanType,
      filterConvenienceSpaces:
        state.searchResultRyokan.filter.filterConvenienceSpaces,
      filterPricePerDay: state.searchResultRyokan.filter.filterPricePerDay,
    }));

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [priceFilterOpend, setPriceFilterOpend] = useState(false);

  //* useRefs
  const minPriceRef = useRef<HTMLInputElement>(null);
  const maxPriceRef = useRef<HTMLInputElement>(null);
  const minPriceSliderRef = useRef<HTMLDivElement>(null);
  const maxPriceSliderRef = useRef<HTMLDivElement>(null);

  //* debouncing Funcion
  const debounceMinPricePerDay = L.debounce((e) => {
    dispatch(
      searchResultsRoomsActions.setFilterMinPricePerDay(
        (+e.target.value / 100) * 500000
      )
    );
  }, 500);

  const debounceMaxPricePerDay = L.debounce((e) => {
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

  //* event callbacks
  const selectRyokanType = (objKey: string) => {
    typeof objKey === 'string'
      ? dispatch(searchResultsRoomsActions.setFilterRyokanType(objKey))
      : dispatch(dispatch(searchResultsRoomsActions.setFilterRyokanType('')));
  };
  const clickConvenienceFilter = (convenienceTypeKey: string) => {
    if (
      !filterConvenienceSpaces.includes(
        convenienceTypeKey as keyof convenienceSpacesType
      )
    ) {
      dispatch(
        searchResultsRoomsActions.setFilterConvenienceSpace([
          ...filterConvenienceSpaces,
          convenienceTypeKey as keyof convenienceSpacesType,
        ])
      );
      return;
    }
    dispatch(
      searchResultsRoomsActions.setFilterConvenienceSpace(
        filterConvenienceSpaces.filter(
          (convenienceSpace) =>
            convenienceSpace !==
            (convenienceTypeKey as keyof convenienceSpacesType)
        )
      )
    );
  };
  const fiterMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(+e.target.value);
    dispatchMinPricePerDay(e);
  };
  const fiterMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(+e.target.value);
    dispatchMaxPricePerDay(e);
  };

  return (
    <div className={className} {...props}>
      <div className="flex justify-center items-center mx-3 space-x-3">
        <span>료칸 유형</span>
        <Selector
          options={['없음', ...Object.values(RyokanType)]}
          value={RyokanType[filterRyokanType] || '료칸 유형을 선택해주세요.'}
          disableOption="'료칸 유형을 선택해주세요.'"
          onChange={(e) =>
            selectElementSelector(e.target.value)(selectRyokanType, RyokanType)
          }
        />
      </div>
      <OutsideClickHandler onOutsideClick={() => setPriceFilterOpend(false)}>
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
            <div className="absolute flex flex-col space-y-5 justify-center items-center w-400 h-200 border rounded-lg mt-3">
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
      </OutsideClickHandler>
      <div className="flex flex-wrap space-x-3 ">
        <span className="inline-block border-solid px-2 py-2 ">
          편의시설 필터
        </span>
        {Object.values(ConvenienceSpaces).map((convenienceSpace, index) => (
          <div
            key={v4()}
            className="w-20 px-2 py-2 border rounded-full flex justify-center items-center"
          >
            <button
              className={`${
                filterConvenienceSpaces.includes(
                  Object.keys(ConvenienceSpaces)[
                    index
                  ] as keyof convenienceSpacesType
                )
                  ? 'text-emerald'
                  : 'text-gray-400'
              }`}
              onClick={(e) => {
                selectElementSelector(e.currentTarget.innerHTML)(
                  clickConvenienceFilter,
                  ConvenienceSpaces
                );
              }}
            >
              {convenienceSpace}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
