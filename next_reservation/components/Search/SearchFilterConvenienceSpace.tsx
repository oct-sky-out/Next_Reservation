import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { searchResultsRoomsActions } from '@/store/searchResultsRyokans';
import { v4 } from 'uuid';
import convenienceSpaces from '@/lib/staticData/ConvenienceSpaces';
import { convenienceSpacesType } from '@/types/reduxActionTypes/ReduxRegiserRyokanType';

const SearchFilterConvenienceSpace = () => {
  const dispatch = useDispatch();
  const filterConvenienceSpaces = useSelector(
    (state) => state.searchResultRyokan.filter.filterConvenienceSpaces
  );

  const clickConvenienceFilter = (
    convenienceTypeKey: keyof convenienceSpacesType
  ) => {
    dispatch(
      searchResultsRoomsActions.setFilterConvenienceSpace({
        ...filterConvenienceSpaces,
        [convenienceTypeKey]: !filterConvenienceSpaces[convenienceTypeKey],
      })
    );
  };

  return (
    <div className="flex flex-wrap space-x-3 ">
      <span className="inline-block border-solid px-2 py-2 ">
        편의시설 필터
      </span>
      {Object.values(convenienceSpaces).map((convenienceSpace, index) => (
        <div
          key={v4()}
          className="w-20 px-2 py-2 border rounded-full flex justify-center items-center"
        >
          <button
            className={`${
              filterConvenienceSpaces[
                Object.keys(filterConvenienceSpaces)[
                  index
                ] as keyof convenienceSpacesType
              ]
                ? 'text-emerald'
                : 'text-gray-400'
            }`}
            onClick={() => {
              clickConvenienceFilter(
                Object.keys(filterConvenienceSpaces)[
                  index
                ] as keyof convenienceSpacesType
              );
            }}
          >
            {convenienceSpace}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchFilterConvenienceSpace;
