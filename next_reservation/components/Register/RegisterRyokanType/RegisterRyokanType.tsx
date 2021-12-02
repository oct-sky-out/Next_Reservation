import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../store';
import { registerRyokanActions } from '../../../store/registerRyokan';
import { registerFormValidAction } from '../../../store/registerFormIsValid';
import Selector from '../../../components/common/Selector';
import {
  RyokanType as RyokanTypes,
  BuildingType as BuildingTypes,
} from '../../../lib/staticData/RegisterRyokanType';

const RegisterRyokanType = () => {
  const dispatch = useDispatch();
  const { ryokanType, buildingType, isBuiltInOnsen, isFormValid } = useSelector(
    (selector) => ({
      ryokanType: selector.registerRyokan.ryokanType,
      buildingType: selector.registerRyokan.buildingType,
      isBuiltInOnsen: selector.registerRyokan.isBuiltInOnsen,
      isFormValid: selector.registerIsValid.isValid,
    })
  );

  useEffect(() => {
    if (ryokanType && buildingType) {
      !isFormValid && dispatch(registerFormValidAction.setValid(true));
    }
    if (!(ryokanType && buildingType)) {
      isFormValid && dispatch(registerFormValidAction.setValid(false));
    }
  }, [ryokanType, buildingType]);

  //* useCallbacks
  const selectedRyokanTypeOrBuildingType = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) =>
      (RyokanTypesOrBuildingTypes: { [key: string]: string }) => {
        const typeKey = Object.keys(RyokanTypesOrBuildingTypes).find(
          (key) => RyokanTypesOrBuildingTypes[key] === value
        );
        if (typeKey) {
          if (typeKey in RyokanTypes)
            dispatch(registerRyokanActions.setRyokanType(typeKey));
          if (typeKey in BuildingTypes)
            dispatch(registerRyokanActions.setBuildingType(typeKey));
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
    <div className="w-full col-start-2 register-form animate-fadeInAndUpForm space-y-5 mx-0 my-auto">
      <div className="w-1/2 my-0 mx-auto">
        <span className="text-black mb-3 inline-block text-2xl">료칸유형</span>
        <Selector
          className="mb-5 h-20 ryokan-type-selector"
          onChange={(e) => selectedRyokanTypeOrBuildingType(e)(RyokanTypes)}
          value={RyokanTypes[ryokanType] || '료칸유형을 선택해주세요.'}
          disableOption="료칸유형을 선택해주세요."
          options={Object.values(RyokanTypes)}
        />
      </div>
      <div className="w-1/2 my-0 mx-auto">
        <span className="text-black mb-3 inline-block text-2xl">건물유형</span>
        <Selector
          className="mb-5 h-20 ryokan-building-type-selector"
          onChange={(e) => selectedRyokanTypeOrBuildingType(e)(BuildingTypes)}
          value={BuildingTypes[buildingType] || '건물유형을 선택해주세요.'}
          disableOption="건물유형을 선택해주세요."
          options={Object.values(BuildingTypes)}
        />
      </div>
      <div className="w-1/2 my-0 mx-auto">
        <div className="list-group mb-5 flex justify-center">
          <span className="text-black mb-3 inline-block text-2xl">
            객실 내 온천여부
          </span>
          <label className="inline-flex items-center text-black">
            <div className="flex items-center">
              <input
                id="built-in-onsen"
                className="form-checkbox border-2 border-gray-400 rounded text-emerald h-6 w-6 mr-3 my-auto inline-block ryokan-built-in-onsen"
                type="checkbox"
                checked={isBuiltInOnsen}
                onChange={selectedBuiltInOnsen}
              />
              <span className="my-auto inline-block font-xl">
                객실 내부에 온천이 있습니까?
              </span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default RegisterRyokanType;
