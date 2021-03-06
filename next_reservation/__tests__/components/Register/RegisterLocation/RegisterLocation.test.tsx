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
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../../store';
import { FaLocationArrow } from 'react-icons/fa';
import { AiOutlineExclamation } from 'react-icons/ai';
import { registerRyokanActions } from '../../../../store/registerRyokan';
import { registerFormValidAction } from '../../../../store/registerFormIsValid';
import Selector from '../../../../components/common/Selector';
import Input from '@/components/common/Input';
import selectElementSelector from '../../../../lib/utils/selectElementSelector';
import { Contry } from '../../../../lib/staticData/Contries';

type actionFunctionName =
  | 'setCity'
  | 'setDistrict'
  | 'setStreetAddress'
  | 'setDetailAddress'
  | 'setPostCode';

const RegisterLocation = () => {
  const dispatch = useDispatch();
  const {
    contry,
    city,
    district,
    streetAddress,
    detailAddress,
    postCode,
    latitude,
    longitude,
    isValud,
  } = useSelector((selector) => ({
    contry: selector.registerRyokan.location.contry,
    city: selector.registerRyokan.location.city,
    district: selector.registerRyokan.location.district,
    streetAddress: selector.registerRyokan.location.streetAddress,
    detailAddress: selector.registerRyokan.location.detailAddress,
    postCode: selector.registerRyokan.location.postCode,
    latitude: selector.registerRyokan.location.latitude,
    longitude: selector.registerRyokan.location.longitude,
    isValud: selector.registerIsValid.isValid,
  }));

  const contryKeyFindAfterDispatch = (objKey: string | undefined) => {
    if (objKey) {
      if (objKey in Contry) dispatch(registerRyokanActions.setContry(objKey));
    }
  };

  const locationInputsChanged = (
    { target: { value } }: React.ChangeEvent<HTMLInputElement>,
    actionFunctionName: actionFunctionName
  ) => {
    dispatch(registerRyokanActions[actionFunctionName](value));
  };

  return (
    <div className="w-full col-start-2 flex flex-col justify-center items-center register-form">
      <div className="w-1/3">
        <span className="text-black mb-3 inline-block">
          ????????? ??????????????????.
        </span>
        <div>
          <button data-testid="personnel-sub" value="sub">
            <FaLocationArrow>?????? ?????? ??????</FaLocationArrow>
          </button>
          <span className="text-black">
            <AiOutlineExclamation /> ????????? ???????????? ?????? ??? ????????? ??? ???
            ????????????.
          </span>
        </div>
      </div>
      <div className="w-1/3">
        <Selector
          data-testid="contry"
          className="mb-5 h-20 ryokan-bedroom-count-selector"
          disableOption="????????? ???????????????."
          value={`${contry ? contry : '????????? ???????????????.'}`}
          onChange={(e) =>
            selectElementSelector(e)(contryKeyFindAfterDispatch, Contry)
          }
          options={Object.values(Contry)}
        />
      </div>
      <div className="w-1/3">
        <Input
          data-testid="city"
          type="text"
          id="name-input"
          placeholder="???/?????? ??????????????????."
          onChange={(e) => locationInputsChanged(e, 'setCity')}
        />
        <Input
          data-testid="district"
          type="text"
          id="name-input"
          placeholder="???/???/?????? ??????????????????"
          onChange={(e) => locationInputsChanged(e, 'setDistrict')}
        />
      </div>
      <div className="w-1/3">
        <Input
          data-testid="streetAddress"
          type="text"
          id="name-input"
          placeholder="?????????????????? ??????????????????."
          onChange={(e) => locationInputsChanged(e, 'setStreetAddress')}
        />
      </div>
      <div className="w-1/3">
        <Input
          data-testid="detailAddress"
          type="text"
          id="name-input"
          placeholder="?????????????????? ??????????????????.(??????)"
          onChange={(e) => locationInputsChanged(e, 'setDetailAddress')}
        />
        <Input
          data-testid="postCode"
          type="text"
          id="name-input"
          placeholder="??????????????? ??????????????????"
          onChange={(e) => locationInputsChanged(e, 'setPostCode')}
        />
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

test('?????? ????????? ??????????????? ??????????', async () => {
  render(
    <Provider store={store}>
      <RegisterLocation />
    </Provider>
  );

  const contrySelector = await screen.getByTestId<HTMLSelectElement>('contry');

  userEvent.selectOptions(contrySelector, '????????????');
  expect(store.getState().registerRyokan.location.contry).toEqual(
    'Republic of Korea'
  );
});

test('???/???, ???/???/???, ???????????????, ???????????????, ??????????????? ???????????? ????????? ????????? ??????????', async () => {
  render(
    <Provider store={store}>
      <RegisterLocation />
    </Provider>
  );
  const cityInput = await screen.getByTestId<HTMLInputElement>('city');
  const districtInput = await screen.getByTestId<HTMLInputElement>('district');
  const streetAddressInput = await screen.getByTestId<HTMLInputElement>(
    'streetAddress'
  );
  const detailAddressInput = await screen.getByTestId<HTMLInputElement>(
    'detailAddress'
  );
  const postCodeInput = await screen.getByTestId<HTMLInputElement>('postCode');

  userEvent.type(cityInput, '???????????????');
  expect(store.getState().registerRyokan.location.city).toEqual('???????????????');

  userEvent.type(districtInput, '????????????');
  expect(store.getState().registerRyokan.location.district).toEqual('????????????');

  userEvent.type(streetAddressInput, '???????????? ??????????????? 1');
  expect(store.getState().registerRyokan.location.streetAddress).toEqual(
    '???????????? ??????????????? 1'
  );

  userEvent.type(detailAddressInput, '???????????????');
  expect(store.getState().registerRyokan.location.detailAddress).toEqual(
    '???????????????'
  );

  userEvent.type(postCodeInput, '07233');
  expect(store.getState().registerRyokan.location.postCode).toEqual('07233');
});
