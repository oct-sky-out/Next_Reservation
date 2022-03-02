import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { registerRyokanActions } from '@/store/registerRyokan';
import { registerFormValidAction } from '@/store/registerFormIsValid';
import Selector from '@/components/common/Selector';
import CheckBox from '@/components/common/CheckBox';
import {
  RyokanType as RyokanTypes,
  BuildingType as BuildingTypes,
} from '@/lib/staticData/RegisterRyokanType';
import selectElementSelector from '@/lib/utils/selectElementSelector';

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
  const RyokanTypeOrBuildingTypeKeyFindAfterDispatch = (
    objKey: string | undefined
  ) => {
    if (objKey) {
      if (objKey in RyokanTypes)
        dispatch(registerRyokanActions.setRyokanType(objKey));
      if (objKey in BuildingTypes)
        dispatch(registerRyokanActions.setBuildingType(objKey));
    }
  };

  const selectedBuiltInOnsen = useCallback(
    ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(registerRyokanActions.setIsBuiltInOnsen(checked));
    },
    [isBuiltInOnsen, dispatch]
  );

  return (
    <div className="w-full h-outOfHeader col-start-2 register-form animate-fadeInAndUpForm space-y-5 mx-0 my-auto overflow-auto">
      <div className="h-full flex flex-col justify-center py-5">
        <div className="w-1/2 my-0 mx-auto">
          <span className="text-black mb-3 inline-block text-2xl">
            료칸유형
          </span>
          <Selector
            className="mb-5 h-20 ryokan-type-selector"
            onChange={(e) =>
              selectElementSelector(e.target.value)(
                RyokanTypeOrBuildingTypeKeyFindAfterDispatch,
                RyokanTypes
              )
            }
            value={RyokanTypes[ryokanType] || '료칸유형을 선택해주세요.'}
            disableOption="료칸유형을 선택해주세요."
            options={Object.values(RyokanTypes)}
          />
        </div>
        <div className="w-1/2 my-0 mx-auto">
          <span className="text-black mb-3 inline-block text-2xl">
            건물유형
          </span>
          <Selector
            className="mb-5 h-20 ryokan-building-type-selector"
            onChange={(e) =>
              selectElementSelector(e.target.value)(
                RyokanTypeOrBuildingTypeKeyFindAfterDispatch,
                BuildingTypes
              )
            }
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
            <CheckBox
              labelText="객실 내부에 온천이 있습니까?"
              labelClassName="inline-flex items-center text-black"
              id="built-in-onsen"
              className="ryokan-built-in-onsen"
              checked={isBuiltInOnsen}
              onChange={selectedBuiltInOnsen}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterRyokanType;
