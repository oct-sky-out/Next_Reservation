import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { ryokanFormActions } from '@/store/ryokanForm';
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
      ryokanType: selector.ryokanForm.ryokanType,
      buildingType: selector.ryokanForm.buildingType,
      isBuiltInOnsen: selector.ryokanForm.isBuiltInOnsen,
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
        dispatch(ryokanFormActions.setRyokanType(objKey));
      if (objKey in BuildingTypes)
        dispatch(ryokanFormActions.setBuildingType(objKey));
    }
  };

  const selectedBuiltInOnsen = useCallback(
    ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(ryokanFormActions.setIsBuiltInOnsen(checked));
    },
    [isBuiltInOnsen, dispatch]
  );

  return (
    <div className="w-full h-outOfHeader col-start-2 register-form animate-fadeInAndUpForm space-y-5 mx-0 my-auto overflow-auto">
      <div className="h-full flex flex-col justify-center py-5">
        <div className="w-1/2 my-0 mx-auto">
          <span className="text-black mb-3 inline-block text-2xl">
            ????????????
          </span>
          <Selector
            className="mb-5 h-20 ryokan-type-selector"
            onChange={(e) =>
              selectElementSelector(e.target.value)(
                RyokanTypeOrBuildingTypeKeyFindAfterDispatch,
                RyokanTypes
              )
            }
            value={RyokanTypes[ryokanType] || '??????????????? ??????????????????.'}
            disableOption="??????????????? ??????????????????."
            options={Object.values(RyokanTypes)}
          />
        </div>
        <div className="w-1/2 my-0 mx-auto">
          <span className="text-black mb-3 inline-block text-2xl">
            ????????????
          </span>
          <Selector
            className="mb-5 h-20 ryokan-building-type-selector"
            onChange={(e) =>
              selectElementSelector(e.target.value)(
                RyokanTypeOrBuildingTypeKeyFindAfterDispatch,
                BuildingTypes
              )
            }
            value={BuildingTypes[buildingType] || '??????????????? ??????????????????.'}
            disableOption="??????????????? ??????????????????."
            options={Object.values(BuildingTypes)}
          />
        </div>
        <div className="w-1/2 my-0 mx-auto">
          <div className="list-group mb-5 flex justify-center">
            <span className="text-black mb-3 inline-block text-2xl">
              ?????? ??? ????????????
            </span>
            <CheckBox
              labelText="?????? ????????? ????????? ?????????????"
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
