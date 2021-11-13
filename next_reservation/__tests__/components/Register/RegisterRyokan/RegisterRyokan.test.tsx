//! test import
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
// import { registerRyokanActions } from '../../../../store/registerRyokan';
import { useMockStore } from '../../../../store';
import {
  mockStoreValue,
  useDispatchMock,
  useSelectorMock,
} from '../../../../__mocks__/redux/reduxStateMocks';

//! componet import
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../../store';
import { registerRyokanActions } from '../../../../store/registerRyokan';
import Selector from '../../../../components/common/Selector';
import {
  RyokanType as RyokanTypes,
  BuildingType as BuildingTypes,
} from '../../../../lib/staticData/RegisterRyokanType';

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
    [isBuiltInOnsen]
  );

  return (
    <div>
      <Selector
        data-testid="ryokan-type-selector"
        onChange={(e) => {
          selectedRyokanTypeOrBuildingType(e)(RyokanTypes);
        }}
        disableOption="료칸유형을 선택해주세요."
        options={Object.values(RyokanTypes)}
      />
      <Selector
        data-testid="building-type-selector"
        onChange={(e) => {
          selectedRyokanTypeOrBuildingType(e)(BuildingTypes);
        }}
        disableOption="건물유형을 선택해주세요."
        options={Object.values(BuildingTypes)}
      />
      <div className="list-group">
        <label className="list-group-item">
          <input
            data-testid="is-built-in-onsen-checkbox"
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

const store = useMockStore;

beforeEach(() => {
  const dispatchMock = useDispatchMock;
  store.dispatch = dispatchMock;
  useSelectorMock.mockImplementation((selector) => selector(mockStoreValue));
});

test('료칸 유형 "화실", "양실", "화양실" 중 하나를 고르면 리덕스의 registerRyokant.ryokanType에 스토어에 해당 유형 키값이 들어간다.', async () => {
  render(
    <Provider store={store}>
      <RegisterRyokan />
    </Provider>
  );
  const ryokanTypeSelector = await screen.findByTestId<HTMLSelectElement>(
    'ryokan-type-selector'
  );

  userEvent.selectOptions(ryokanTypeSelector, ['화양실']);
  expect(store.getState().registerRyokan.ryokanType).toEqual(
    'Japanese-Western'
  );
});

test('건물 유형 "독채", "개인실", "공용실공용실(도미토리, 10명이상)" 중 하나를 고르면 리덕스의 registerRyokant.buildingType에 해당 유형 키값이 들어간다.', async () => {
  render(
    <Provider store={store}>
      <RegisterRyokan />
    </Provider>
  );
  const buildingTypeSelector = await screen.findByTestId<HTMLSelectElement>(
    'building-type-selector'
  );

  userEvent.selectOptions(buildingTypeSelector, ['개인실']);
  expect(store.getState().registerRyokan.buildingType).toEqual('Private_Room');
});

test('객실 내부에 온천이 있는지 없는지 선택을 하게되면 리덕스의 registerRyokant.isBuiltInOnsen에 true, false값이 들어간다.', async () => {
  render(
    <Provider store={store}>
      <RegisterRyokan />
    </Provider>
  );
  const isBuiltInCheckbox = await screen.findByTestId<HTMLInputElement>(
    'is-built-in-onsen-checkbox'
  );

  expect(store.getState().registerRyokan.isBuiltInOnsen).toEqual(false);
  userEvent.click(isBuiltInCheckbox); // true로 바뀌길 기대함
  expect(store.getState().registerRyokan.isBuiltInOnsen).toEqual(true);
  userEvent.click(isBuiltInCheckbox); // false로 바뀌길 기대함
  expect(store.getState().registerRyokan.isBuiltInOnsen).toEqual(false);
});
