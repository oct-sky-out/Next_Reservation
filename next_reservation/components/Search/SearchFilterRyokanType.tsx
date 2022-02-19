import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { searchResultsRoomsActions } from '@/store/searchResultsRyokans';
import Selector from '../common/Selector';
import selectElementSelector from '@/lib/utils/selectElementSelector';
import { RyokanType } from '@/lib/staticData/RegisterRyokanType';

const SearchFilterRyokanType = () => {
  const filterRyokanType = useSelector(
    (state) => state.searchResultRyokan.filter.filterRyokanType
  );
  const dispatch = useDispatch();
  const selectRyokanType = (objKey: string) => {
    typeof objKey === 'string'
      ? dispatch(searchResultsRoomsActions.setFilterRyokanType(objKey))
      : dispatch(dispatch(searchResultsRoomsActions.setFilterRyokanType('')));
  };
  return (
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
  );
};

export default SearchFilterRyokanType;
