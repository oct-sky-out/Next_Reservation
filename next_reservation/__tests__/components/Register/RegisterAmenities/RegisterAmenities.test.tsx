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
import { useSelector } from '../../../../store';
import { registerRyokanActions } from '../../../../store/registerRyokan';
import { registerFormValidAction } from '../../../../store/registerFormIsValid';
import { v4 } from 'uuid';
import useDidMounted from '@/components/hooks/useDidMounted';
import CheckBox from '@/components/common/CheckBox';
import Amenities from '../../../../lib/staticData/Amenities';

const RegisterRyokanAmenities = () => {
  //* Redux
  const dispatch = useDispatch();
  const amenities = useSelector(
    (selector) => selector.registerRyokan.amenities
  );

  //* First Render Ref
  const didMounted = useDidMounted();

  // * useEffect
  useEffect(() => {
    if (!didMounted) {
      dispatch(registerFormValidAction.setValid(true));
    }
  }, [didMounted]);

  //* useCallback
  const checkedAmenity = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const amenitiesKeys = [
        'breakfast',
        'closet',
        'coolingEquipment',
        'heatingEquipment',
        'internet',
        'toiletries',
        'hairdryer',
        'tv',
      ] as const;

      dispatch(
        registerRyokanActions.setAmenities({
          amenityKey: amenitiesKeys[index],
          amenityValue: target.checked,
        })
      );
    },
    [amenities]
  );

  return (
    <div className="w-full col-start-2 flex flex-col justify-center items-center register-form">
      <div className="w-1/3">
        {Object.entries(Amenities).map((amenity, index) => (
          <CheckBox
            id="amenity"
            key={v4()}
            value={amenity[1]}
            labelText={amenity[1]}
            onChange={(e) => checkedAmenity(e, index)}
            data-testid={`${index}-${amenity[0]}`}
          />
        ))}
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
      <RegisterRyokanAmenities />
    </Provider>
  );
  const amenitiesCheckBoxes =
    RegisterRyokanAmenitiesComponent.container.querySelectorAll<HTMLInputElement>(
      '#amenity'
    );

  const amenitiesKeys = [
    '????????????',
    '??????',
    '????????????',
    '????????????',
    '?????????',
    '????????????',
    '??????????????????',
    '????????????',
  ] as const;

  amenitiesCheckBoxes.forEach((checkBox) => {
    expect(amenitiesKeys).toContain(checkBox.value);
  });
});

test('??????, ????????????, ????????????, ????????????, ??????????????? ???????????? ???, ??? ?????? ?????????????', async () => {
  render(
    <Provider store={store}>
      <RegisterRyokanAmenities />
    </Provider>
  );

  const breakfastCheckBox = await screen.getByTestId<HTMLInputElement>(
    '0-breakfast'
  );
  const coolingEquipmentCheckBox = await screen.getByTestId<HTMLInputElement>(
    '2-coolingEquipment'
  );
  const heatingEquipmentCheckBox = await screen.getByTestId<HTMLInputElement>(
    '3-heatingEquipment'
  );
  const toiletriesCheckBox = await screen.getByTestId<HTMLInputElement>(
    '5-toiletries'
  );
  const hairdryerCheckBox = await screen.getByTestId<HTMLInputElement>(
    '6-hairdryer'
  );

  userEvent.click(breakfastCheckBox);
  userEvent.click(coolingEquipmentCheckBox);
  userEvent.click(heatingEquipmentCheckBox);
  userEvent.click(toiletriesCheckBox);
  userEvent.click(hairdryerCheckBox);

  expect(store.getState().registerRyokan.amenities).toEqual({
    breakfast: true,
    closet: false,
    coolingEquipment: true,
    heatingEquipment: true,
    internet: false,
    toiletries: true,
    hairdryer: true,
    tv: false,
  });
});
