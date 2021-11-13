import { GetServerSideProps } from 'next';
import React, { useCallback, useState } from 'react';
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
    <RegisterRyokanStyle>
      <div className="grid grid-cols-2 h-full">
        <div className="left-side-description col-start-1 flex justify-center items-center">
          <h1 className="text-white text-5xl">
            호스팅 할 료칸유형을 선택해주세요.
          </h1>
        </div>
        <div className="w-full col-start-2 flex flex-col justify-center p-10">
          <span className="text-black mb-3">1. 료칸유형</span>
          <Selector
            className="mb-5"
            onChange={(e) => selectedRyokanTypeOrBuildingType(e)(RyokanTypes)}
            value={ryokanAndBuildingType.ryokan}
            disableOption="료칸유형을 선택해주세요."
            options={Object.values(RyokanTypes)}
          />
          <span className="text-black mb-3">2. 건물유형</span>
          <Selector
            className="mb-5"
            onChange={(e) => selectedRyokanTypeOrBuildingType(e)(BuildingTypes)}
            value={ryokanAndBuildingType.building}
            disableOption="건물유형을 선택해주세요."
            options={Object.values(BuildingTypes)}
          />
          <div className="list-group mb-5 flex justify-center">
            <span className="text-black mb-3">3. 객실 내 온천여부</span>
            <label className="list-group-item">
              <input
                id="built-in-onsen"
                className="form-check-input m-0 mr-1 "
                type="checkbox"
                onChange={selectedBuiltInOnsen}
              />
              객실 내부에 온천이 있습니까?
            </label>
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
