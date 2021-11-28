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
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../../store';
import { registerRyokanActions } from '../../../../store/registerRyokan';
import { registerFormValidAction } from '../../../../store/registerFormIsValid';

const RegisterRyokanBathrooms = () => {
  //* Redux
  const dispatch = useDispatch();
  const { bathCount, isFormValid } = useSelector((selector) => ({
    bathCount: selector.registerRyokan.bathrooms.bathCount,
    isFormValid: selector.registerIsValid.isValid,
  }));

  //* useState
  const [isShareCheck, setIsShareCheck] = useState(false);

  //* useEffect
  useEffect(() => {
    if (isShareCheck && bathCount) {
      !isFormValid && dispatch(registerFormValidAction.setValid(true));
    }
    if (!(isShareCheck && bathCount)) {
      isFormValid && dispatch(registerFormValidAction.setValid(false));
    }
  }, [isShareCheck, bathCount, isFormValid]);

  //* useCallbacks
  const bathCountAddOrSub = useCallback(
    ({ currentTarget: { value } }: React.MouseEvent<HTMLButtonElement>) => {
      if (value === 'add')
        dispatch(registerRyokanActions.setBathCount(bathCount + 1));
      if (value === 'sub')
        dispatch(registerRyokanActions.setBathCount(bathCount - 1));
    },
    [bathCount]
  );
  const isBathShared = useCallback(
    (isShared: boolean) => {
      if (isShared) dispatch(registerRyokanActions.setIsBathShared(true));
      if (!isShared) dispatch(registerRyokanActions.setIsBathShared(false));
      !isShareCheck && setIsShareCheck(true);
    },
    [isShareCheck]
  );
  return (
    <div className="w-full col-start-2 flex flex-col justify-center items-center register-form">
      <div className="w-1/3">
        <span className="text-black mb-3 inline-block">
          게스트가 사용할 객실의 욕실 수를 입력해 주세요.
        </span>
        <div>
          <button
            data-testid="bathCount-sub"
            value="sub"
            onClick={bathCountAddOrSub}
          >
            -
          </button>
          <span>{bathCount}</span>
          <button
            data-testid="bathCount-add"
            value="add"
            onClick={bathCountAddOrSub}
          >
            +
          </button>
        </div>
      </div>
      <div className="w-1/3">
        <span className="text-black mb-3 inline-block">공용 욕실인가요?</span>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="bath-shared"
            data-testid="bath-shared"
            onChange={() => {
              isBathShared(true);
            }}
          />
          <label className="form-check-label" htmlFor="bath-shared">
            예, 공용 욕실입니다.
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="bath-non-shared"
            data-testid="bath-non-shared"
            onChange={() => {
              isBathShared(false);
            }}
          />
          <label className="form-check-label" htmlFor="bath-non-shared">
            아니요, 게스트가 단독으로 사용합니다.
          </label>
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

test('욕실 수를 늘이면 registerRyokan.bathrooms.bathCount가 늘어나는가?', async () => {
  render(
    <Provider store={store}>
      <RegisterRyokanBathrooms />
    </Provider>
  );

  const bathCountAddBtn = await screen.getByTestId<HTMLButtonElement>(
    'bathCount-add'
  );

  userEvent.click(bathCountAddBtn);
  expect(store.getState().registerRyokan.bathrooms.bathCount).toEqual(1);
});

test('욕실 수를 줄이면 registerRyokan.bathrooms.bathCount가 줄어드는가?', async () => {
  render(
    <Provider store={store}>
      <RegisterRyokanBathrooms />
    </Provider>
  );

  const bathCountSubBtn = await screen.getByTestId<HTMLButtonElement>(
    'bathCount-sub'
  );

  userEvent.click(bathCountSubBtn);
  expect(store.getState().registerRyokan.bathrooms.bathCount).toEqual(-1);
});

test('공용욕실 여부 라디오 버튼을 클릭하면 registerRyokan.bathrooms.isShared가 true, false로 바뀌는가?', async () => {
  render(
    <Provider store={store}>
      <RegisterRyokanBathrooms />
    </Provider>
  );

  const bathSharedRadio = await screen.getByTestId<HTMLInputElement>(
    'bath-shared'
  );
  const bathNonSharedRadio = await screen.getByTestId<HTMLInputElement>(
    'bath-non-shared'
  );
  userEvent.click(bathSharedRadio);
  expect(store.getState().registerRyokan.bathrooms.isShared).toEqual(true);
  userEvent.click(bathNonSharedRadio);
  expect(store.getState().registerRyokan.bathrooms.isShared).toEqual(false);
});
