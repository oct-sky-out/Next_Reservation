import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../store';
import { registerRyokanActions } from '../../../store/registerRyokan';
import Selector from '../../../components/common/Selector';
import {
  RyokanType as RyokanTypes,
  BuildingType as BuildingTypes,
} from '../../../lib/staticData/RegisterRyokanType';

const RegisterRyokan = () => {
  //* Redux
  const dispatch = useDispatch();
  const { ryokanType, buildingType, isBuiltInOnsen } = useSelector(
    (selector) => ({
      ryokanType: selector.registerRyokan.ryokanType,
      buildingType: selector.registerRyokan.buildingType,
      isBuiltInOnsen: selector.registerRyokan.isBuiltInOnsen,
    })
  );
  //* useStates
  const [ryokanAndBuildingType, setryokanAndBuildingType] = useState({
    ryokan: '료칸유형을 선택해주세요.',
    building: '건물유형을 선택해주세요.',
  });
  //* useCallbacks
  const selectedRyokanTypeOrBuildingType = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) =>
      (RyokanTypesOrBuildingTypes: { [key: string]: string }) => {
        const typeKey = Object.keys(RyokanTypesOrBuildingTypes).find(
          (key) => RyokanTypesOrBuildingTypes[key] === value
        );
        if (typeKey) {
          if (typeKey in RyokanTypes) {
            setryokanAndBuildingType({
              ...ryokanAndBuildingType,
              ryokan: value,
            });
            dispatch(registerRyokanActions.setRyokanType(typeKey));
          }
          if (typeKey in BuildingTypes) {
            setryokanAndBuildingType({
              ...ryokanAndBuildingType,
              building: value,
            });
            dispatch(registerRyokanActions.setBuildingType(typeKey));
          }
        }
      },
    [buildingType, ryokanType]
  );

  const selectedBuiltInOnsen = useCallback(
    ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(registerRyokanActions.setIsBuiltInOnsen(checked));
    },
    [isBuiltInOnsen, dispatch]
  );

  return (
    <div>
      <Selector
        onChange={(e) => selectedRyokanTypeOrBuildingType(e)(RyokanTypes)}
        value={ryokanAndBuildingType.ryokan}
        disableOption="료칸유형을 선택해주세요."
        options={Object.values(RyokanTypes)}
      />
      <Selector
        onChange={(e) => selectedRyokanTypeOrBuildingType(e)(BuildingTypes)}
        value={ryokanAndBuildingType.building}
        disableOption="건물유형을 선택해주세요."
        options={Object.values(BuildingTypes)}
      />
      <div className="list-group">
        <label className="list-group-item">
          <input
            className="form-check-input me-1"
            type="checkbox"
            value=""
            onChange={selectedBuiltInOnsen}
          />
          객실 내부에 온천이 있습니까?
        </label>
      </div>
    </div>
  );
};

export default RegisterRyokan;
