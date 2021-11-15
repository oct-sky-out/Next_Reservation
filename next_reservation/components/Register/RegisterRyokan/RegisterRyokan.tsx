import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../store';
import { registerRyokanActions } from '../../../store/registerRyokan';
import Selector from '../../../components/common/Selector';
import {
  RyokanType as RyokanTypes,
  BuildingType as BuildingTypes,
} from '../../../lib/staticData/RegisterRyokanType';
import RegisterFooter from '../RegisterFooter/RegisterFooter';
import RegisterRyokanStyle from '../../../styles/components/Register/RegisterRyokan';

interface IPorps {
  priviousHref: string;
}

const RegisterRyokan: React.FC<IPorps> = ({ priviousHref }) => {
  //* Redux
  const dispatch = useDispatch();
  const { ryokanType, buildingType, isBuiltInOnsen } = useSelector(
    (selector) => ({
      ryokanType: selector.registerRyokan.ryokanType,
      buildingType: selector.registerRyokan.buildingType,
      isBuiltInOnsen: selector.registerRyokan.isBuiltInOnsen,
    })
  );
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
    <RegisterRyokanStyle>
      <div className="grid grid-cols-2 h-full">
        <div className="left-side-description col-start-1 flex justify-center items-center">
          <h1 className="text-white text-5xl">
            호스팅 할 료칸유형을 선택해주세요.
          </h1>
        </div>
        <div className="w-full col-start-2 flex flex-col justify-center items-center">
          <div className="w-1/3">
            <span className="text-black mb-3 inline-block">1. 료칸유형</span>
            <Selector
              className="mb-5 h-20"
              onChange={(e) => selectedRyokanTypeOrBuildingType(e)(RyokanTypes)}
              value={RyokanTypes[ryokanType] || '료칸유형을 선택해주세요.'}
              disableOption="료칸유형을 선택해주세요."
              options={Object.values(RyokanTypes)}
            />
          </div>
          <div className="w-1/3">
            <span className="text-black mb-3 inline-block">2. 건물유형</span>
            <Selector
              className="mb-5 h-20"
              onChange={(e) =>
                selectedRyokanTypeOrBuildingType(e)(BuildingTypes)
              }
              value={BuildingTypes[buildingType] || '건물유형을 선택해주세요.'}
              disableOption="건물유형을 선택해주세요."
              options={Object.values(BuildingTypes)}
            />
          </div>
          <div className="w-1/3">
            <div className="list-group mb-5 flex justify-center">
              <span className="text-black mb-3 inline-block">
                3. 객실 내 온천여부
              </span>
              <label className="list-group-item h-10 items-center ">
                <div>
                  <input
                    id="built-in-onsen"
                    className="form-check-input mr-3 my-auto inline-block"
                    type="checkbox"
                    onChange={selectedBuiltInOnsen}
                  />
                  <span className="my-auto inline-block">
                    객실 내부에 온천이 있습니까?
                  </span>
                </div>
              </label>
            </div>
          </div>
          <RegisterFooter
            isValild={!(ryokanType && buildingType)}
            nextHref="/room/register/bedrooms"
            previousHref={priviousHref}
          />
        </div>
      </div>
    </RegisterRyokanStyle>
  );
};

export default RegisterRyokan;
