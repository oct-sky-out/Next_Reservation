import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useMockStore } from '../../../store';
import {
  mockStoreValue,
  useDispatchMock,
  useSelectorMock,
} from '../../../__mocks__/redux/reduxStateMocks';

import { Provider, useDispatch } from 'react-redux';
import { useSelector } from '../../../store';
import Selector from '../../../components/common/Selector';
import { RyokanType } from '../../../lib/staticData/RegisterRyokanType';
import ConvenienceSpaces from '../../../lib/staticData/ConvenienceSpaces';
import selectElementSelector from '../../../lib/utils/selectElementSelector';
import { searchResultsRoomsActions } from '../../../store/searchResultsRyokans';
import React from 'react';
import { v4 } from 'uuid';

const SearchFilter = () => {
  const dispatch = useDispatch();
  const { filterRyokanType, filterConvenienceSpaces, filterPricePerDay } =
    useSelector((state) => ({
      filterRyokanType: state.searchResultRyokan.filter.filterRyokanType,
      filterConvenienceSpaces:
        state.searchResultRyokan.filter.filterConvenienceSpaces,
      filterPricePerDay: state.searchResultRyokan.filter.filterPricePerDay,
    }));

  const selectRyokanType = (ryokanTypeKey: string) => {
    dispatch(searchResultsRoomsActions.setFilterRyokanType(ryokanTypeKey));
  };
  const clickConvenienceFilter = (convenienceTypeKey: string) => {
    dispatch(
      searchResultsRoomsActions.setFilterConvenienceSpace([
        ...filterConvenienceSpaces,
        convenienceTypeKey,
      ])
    );
  };
  const fiterMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      searchResultsRoomsActions.setFilterPricePerDay({
        ...filterPricePerDay,
        min: +e.target.value,
      })
    );
  };
  const fiterMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      searchResultsRoomsActions.setFilterPricePerDay({
        ...filterPricePerDay,
        max: +e.target.value,
      })
    );
  };
  return (
    <div>
      <Selector
        data-testid="ryokan-type-filter"
        options={Object.values(RyokanType)}
        value={RyokanType[filterRyokanType] || '?????? ????????? ??????????????????'}
        disableOption="?????? ????????? ??????????????????."
        onChange={(e) =>
          selectElementSelector(e.target.value)(selectRyokanType, RyokanType)
        }
      />
      {/* ?????? ??? input??? ???????????? ????????? UI?????? ?????? */}
      <input
        data-testid="ryokan-price-min"
        type="number"
        value={filterPricePerDay.min || 0}
        onChange={fiterMinPrice}
      />
      <input
        data-testid="ryokan-price-max"
        type="number"
        value={filterPricePerDay.max || 0}
        onChange={fiterMaxPrice}
      />
      {Object.values(ConvenienceSpaces).map((convenienceSpace, index) => (
        <button
          data-testid={`ryokan-convenience-${index}`}
          key={v4()}
          onClick={(e) => {
            selectElementSelector(e.currentTarget.innerHTML)(
              clickConvenienceFilter,
              ConvenienceSpaces
            );
          }}
        >
          {convenienceSpace}
        </button>
      ))}
    </div>
  );
};

const store = useMockStore;

describe('?????? ?????? ?????? ?????????', () => {
  beforeEach(() => {
    const dispatchMock = useDispatchMock;
    store.dispatch = dispatchMock;
    useSelectorMock.mockImplementation((selector) => selector(mockStoreValue));
    render(
      <Provider store={store}>
        <SearchFilter />
      </Provider>
    );
  });
  test('??????????????? ??????????????? ????????? ????????????????', async () => {
    const ryokanTypeFilter = await screen.getByTestId<HTMLSelectElement>(
      'ryokan-type-filter'
    );
    userEvent.selectOptions(ryokanTypeFilter, '?????????');
    expect(store.getState().searchResultRyokan.filter.filterRyokanType).toBe(
      'Japanese-Western'
    );
  });
  test('1????????? ??????, ??????????????? ??????????????? ????????? ????????????????', async () => {
    const ryokanPriceMin = await screen.getByTestId<HTMLInputElement>(
      'ryokan-price-min'
    );
    const ryokanPriceMax = await screen.getByTestId<HTMLInputElement>(
      'ryokan-price-max'
    );
    userEvent.type(ryokanPriceMin, '10000');
    expect(
      store.getState().searchResultRyokan.filter.filterPricePerDay.min
    ).toBe(10000);

    userEvent.type(ryokanPriceMax, '100000');
    expect(
      store.getState().searchResultRyokan.filter.filterPricePerDay.max
    ).toBe(100000);
  });
  test('1????????? ??????, ??????????????? ??????????????? ????????? ????????????????', async () => {
    const ryokanPriceMin = await screen.getByTestId<HTMLInputElement>(
      'ryokan-price-min'
    );
    const ryokanPriceMax = await screen.getByTestId<HTMLInputElement>(
      'ryokan-price-max'
    );
    userEvent.type(ryokanPriceMin, '10000');
    expect(
      store.getState().searchResultRyokan.filter.filterPricePerDay.min
    ).toBe(10000);

    userEvent.type(ryokanPriceMax, '100000');
    expect(
      store.getState().searchResultRyokan.filter.filterPricePerDay.max
    ).toBe(100000);
  });
  test('?????????????????? ??????????????? ????????? ????????????????', async () => {
    const ryokanConvenienceGym = await screen.getByTestId<HTMLButtonElement>(
      'ryokan-convenience-0'
    );

    userEvent.click(ryokanConvenienceGym);
    expect(
      store.getState().searchResultRyokan.filter.filterConvenienceSpaces
    ).toEqual(['gym']);
  });
});
