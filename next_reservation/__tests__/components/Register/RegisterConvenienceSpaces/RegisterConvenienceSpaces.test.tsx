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
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { registerRyokanActions } from '@/store/registerRyokan';
import { registerFormValidAction } from '@/store/registerFormIsValid';
import { v4 } from 'uuid';
import useDidMounted from '@/components/hooks/useDidMounted';
import CheckBox from '@/components/common/CheckBox';
import ConvenienceSpaces from '@/lib/staticData/ConvenienceSpaces';

const RegisterConvenienceSpaces = () => {
  //* Redux
  const dispatch = useDispatch();
  const convenienceSpaces = useSelector(
    (selector) => selector.registerRyokan.convenienceSpaces
  );

  //* First Render Ref
  const didMounted = useDidMounted();

  // * useEffect
  useEffect(() => {
    if (!didMounted) {
      dispatch(registerFormValidAction.setValid(true));
    }
  }, [didMounted]);

  const convenienceSpaceKeys = [
    'gym',
    'jacuzzi',
    'parkingLot',
    'swimmingPool',
    'washingMachine',
    'garden',
  ] as const;

  //* useCallback
  const checkedConvenienceSpace = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>, index: number) => {
      dispatch(
        registerRyokanActions.setConvenienceSpace({
          spaceKey: convenienceSpaceKeys[index],
          spaceValue: target.checked,
        })
      );
    },
    [convenienceSpaces]
  );

  return (
    <div className="w-full text-black h-outOfHeader col-start-2 register-form animate-fadeInAndUpFor register-form overflow-auto">
      <div className="w-1/3 h-full mx-auto my-0 relative py-5">
        <div className="w-full absolute top-1/2 transform -translate-y-1/2 h-2/3 mx-0 my-auto space-y-10">
          <h1 className="text-2xl">????????? ??????????????? ??????????????????.</h1>
          <div>
            <div className="w-full flex flex-col justify-around space-y-5">
              {Object.entries(ConvenienceSpaces).map(
                (convenienceSpace, index) => (
                  <CheckBox
                    id="convinenceSpaces"
                    key={v4()}
                    labelText={convenienceSpace[1]}
                    value={convenienceSpace[1]}
                    checked={convenienceSpaces[convenienceSpaceKeys[index]]}
                    onChange={(e) => checkedConvenienceSpace(e, index)}
                    className="justify-self-stretch"
                    labelClassName={`${index}-${convenienceSpace[0]}`}
                    data-testid={`${index}-${convenienceSpace[0]}`}
                  />
                )
              )}
            </div>
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

test('??? ??????????????? value?????? ??? Rendering??? ?????????????', async () => {
  const RegisterRyokanAmenitiesComponent = render(
    <Provider store={store}>
      <RegisterConvenienceSpaces />
    </Provider>
  );
  const amenitiesCheckBoxes =
    RegisterRyokanAmenitiesComponent.container.querySelectorAll<HTMLInputElement>(
      '#convinenceSpaces'
    );

  const amenitiesValues = [
    '?????????',
    '?????????',
    '?????????',
    '?????????',
    '?????????',
    '??????',
  ] as const;

  amenitiesCheckBoxes.forEach((checkBox) => {
    expect(amenitiesValues).toContain(checkBox.value);
  });
});

test('?????????, ?????????, ?????????, ?????????, ?????????, ????????? ??????????????? ????????? ????????? ???, ??? ?????? ?????????????', async () => {
  render(
    <Provider store={store}>
      <RegisterConvenienceSpaces />
    </Provider>
  );

  const jacuzziCheckBox = await screen.getByTestId<HTMLInputElement>(
    '1-jacuzzi'
  );
  const parkingLotCheckBox = await screen.getByTestId<HTMLInputElement>(
    '2-parkingLot'
  );
  const washingMachineCheckBox = await screen.getByTestId<HTMLInputElement>(
    '4-washingMachine'
  );
  const gardenCheckBox = await screen.getByTestId<HTMLInputElement>('5-garden');

  userEvent.click(jacuzziCheckBox);
  userEvent.click(parkingLotCheckBox);
  userEvent.click(washingMachineCheckBox);
  userEvent.click(gardenCheckBox);

  console.log(store.getState().registerRyokan.convenienceSpaces);
  expect(store.getState().registerRyokan.convenienceSpaces).toEqual({
    gym: false,
    jacuzzi: true,
    parkingLot: true,
    swimmingPool: false,
    washingMachine: true,
    garden: true,
  });
});
