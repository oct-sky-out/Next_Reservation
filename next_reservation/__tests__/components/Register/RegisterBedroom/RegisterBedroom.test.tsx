//! test import
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { useMockStore } from '../../../../store';
import {
  mockStoreValue,
  useDispatchMock,
  useSelectorMock,
} from '../../../../__mocks__/redux/reduxStateMocks';

//! componet import
import React, { useCallback, useEffect, useMemo } from 'react';
import { v4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../../store';
import { registerRyokanActions } from '../../../../store/registerRyokan';
import { registerFormValidAction } from '../../../../store/registerFormIsValid';
import Selector from '../../../../components/common/Selector';
import {
  BedTypes,
  BedroomCount,
} from '../../../../lib/staticData/RegisterRyokanBedrooms';

const RegisterRyokanBeedrooms = () => {
  const dispatch = useDispatch();
  const { bedroomList, bedroomCount, personnel, isFormValid } = useSelector(
    (selector) => ({
      bedroomList: selector.registerRyokan.bedrooms.bedroomList,
      bedroomCount: selector.registerRyokan.bedrooms.bedroomCount,
      personnel: selector.registerRyokan.bedrooms.personnel,
      isFormValid: selector.registerIsValid.isValid,
    })
  );

  useEffect(() => {
    if (bedroomList && bedroomCount && personnel) {
      !isFormValid && dispatch(registerFormValidAction.setValid(true));
    }
    if (!(bedroomList && bedroomCount && personnel)) {
      isFormValid && dispatch(registerFormValidAction.setValid(false));
    }
  }, [bedroomList, bedroomCount, personnel]);

  //* useCallbacks
  const personnelAddOrSub = useCallback(
    ({ currentTarget: { value } }: React.MouseEvent<HTMLButtonElement>) => {
      if (value === 'add')
        dispatch(registerRyokanActions.setPersonnel(personnel + 1));
      if (value === 'sub')
        dispatch(registerRyokanActions.setPersonnel(personnel - 1));
    },
    [personnel]
  );
  const selectBedroomCounted = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
      const count = value.match(/([\d])+/g);
      if (count) dispatch(registerRyokanActions.setBedroomCount(+count[0]));
    },
    [bedroomCount]
  );
  //* useMemo
  const getBedroomList = useMemo(
    () =>
      bedroomList.map((bedrooms, bedroomNumber) => {
        return (
          <div key={v4()}>
            <div>
              <span>{bedroomNumber + 1}번 침실</span>
              {bedrooms.map((bedroom) => {
                return (
                  <span key={v4()}>
                    {BedTypes[bedroom.bedType]} {bedroom.count}개
                  </span>
                );
              })}
              <button>침대 추가 또는 수정하기</button>
            </div>
          </div>
        );
      }),
    [bedroomList, bedroomCount]
  );

  return (
    <div className="w-full col-start-2 flex flex-col justify-center items-center register-form">
      <div className="w-1/3">
        <span className="text-black mb-3 inline-block">최대 숙박 인원</span>
        <div>
          <button
            data-testid="personnel-sub"
            value="sub"
            onClick={personnelAddOrSub}
          >
            -
          </button>
          <span>{personnel}</span>
          <button
            data-testid="personnel-add"
            value="add"
            onClick={personnelAddOrSub}
          >
            +
          </button>
        </div>
      </div>
      <div className="w-1/3">
        <span className="text-black mb-3 inline-block">
          게스트가 사용 가능한 침실개수를 정해주세요.
        </span>
        <Selector
          data-testid="bedroom-count"
          className="mb-5 h-20 ryokan-bedroom-count-selector"
          disableOption="침실개수를 선택해주세요."
          value={`침실 ${bedroomCount}개`}
          onChange={selectBedroomCounted}
          options={BedroomCount}
        />
      </div>
      <div className="w-1/3">
        <div className="list-group mb-5 flex justify-center">
          <span className="text-black mb-3 inline-block">침대유형</span>
          <span className="text-black mb-3 inline-block">
            모든 게스트가 편안하게 숙박할 수 있도록 침대가 충분히 구비되어있는지
            확인해주세요.
          </span>
          <div className="divide-y-2 border-t-2 border-b-2">
            {getBedroomList}
          </div>
        </div>
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

test('숙박인원 추가 시 registerRyokan.bedrooms.personnel의 값이 늘어나는가?', async () => {
  render(
    <Provider store={store}>
      <RegisterRyokanBeedrooms />
    </Provider>
  );

  const personnelAddBtn = await screen.getByTestId<HTMLButtonElement>(
    'personnel-add'
  );

  userEvent.click(personnelAddBtn);
  expect(store.getState().registerRyokan.bedrooms.personnel).toEqual(1);
});

test('숙박인원 제거 시 registerRyokan.bedrooms.personnel의 값이 줄어드는가?', async () => {
  render(
    <Provider store={store}>
      <RegisterRyokanBeedrooms />
    </Provider>
  );

  const personnelSubBtn = await screen.getByTestId<HTMLButtonElement>(
    'personnel-sub'
  );

  userEvent.click(personnelSubBtn);
  expect(store.getState().registerRyokan.bedrooms.personnel).toEqual(-1);
});

test('침실 개수 셀렉터 값 변경 시 registerRyokan.bedrooms.bedroomCount의 값이 바뀌고 침실리스트의 수가 늘인 값만큼 늘었는가?', async () => {
  render(
    <Provider store={store}>
      <RegisterRyokanBeedrooms />
    </Provider>
  );

  const bedroomCountSelector = await screen.getByTestId<HTMLSelectElement>(
    'bedroom-count'
  );
  userEvent.selectOptions(bedroomCountSelector, ['침실 2개']);
  expect(store.getState().registerRyokan.bedrooms.bedroomCount).toEqual(2);
  expect(store.getState().registerRyokan.bedrooms.bedroomList).toHaveLength(2);
});
