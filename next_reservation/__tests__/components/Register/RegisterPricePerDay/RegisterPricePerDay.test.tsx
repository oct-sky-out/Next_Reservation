//! test import
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { useMockStore } from '@/store/index';
import {
  mockStoreValue,
  useDispatchMock,
  useSelectorMock,
} from '../../../../__mocks__/redux/reduxStateMocks';

//! component test
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { registerRyokanActions } from '@/store/registerRyokan';
import { registerFormValidAction } from '@/store/registerFormIsValid';
import Input from '@/components/common/Input';

const RegisterPricePerDay = () => {
  const dispatch = useDispatch();
  const pricePerDay = useSelector(
    (selector) => selector.registerRyokan.pricePerDay
  );

  useEffect(() => {
    if (+pricePerDay <= 0) dispatch(registerFormValidAction.setValid(false));
    if (+pricePerDay > 0) dispatch(registerFormValidAction.setValid(true));
  }, [pricePerDay]);

  const changePrice = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const locailPrice = +value;
    console.log(locailPrice.toLocaleString());
    dispatch(
      registerRyokanActions.setPricePerDay(locailPrice.toLocaleString())
    );
  };

  return (
    <div>
      <div>
        <div>
          <span>1박당 가격을 설정해주세요.</span>
        </div>
        <div>
          <Input
            data-testid="price-input"
            type="number"
            value={pricePerDay}
            placeholder=""
            onChange={changePrice}
          />
        </div>
      </div>
    </div>
  );
};

describe('가격 등록 컴포넌트 테스트', () => {
  beforeEach(() => {
    const dispatchMock = useDispatchMock;
    useMockStore.dispatch = dispatchMock;
    useSelectorMock.mockImplementation((selector) => selector(mockStoreValue));

    render(
      <Provider store={useMockStore}>
        <RegisterPricePerDay />
      </Provider>
    );
  });
  test('가격을 변경하면 리듀서와 인풋박스에 가격이 변동이 되는가?', async () => {
    const priceInput = await screen.findByTestId<HTMLInputElement>(
      'price-input'
    );

    userEvent.type(priceInput, '100000');
    expect(useMockStore.getState().registerRyokan.pricePerDay).toBe('100,000');
  });
});
