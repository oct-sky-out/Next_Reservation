//! componet import
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'store';
import { registerRyokanActions } from '@/store/registerRyokan';
import { registerFormValidAction } from '@/store/registerFormIsValid';

const RegisterRyokanBathrooms = () => {
  //* Redux
  const dispatch = useDispatch();
  const { bathCount, isShared, isFormValid } = useSelector((selector) => ({
    bathCount: selector.registerRyokan.bathrooms.bathCount,
    isShared: selector.registerRyokan.bathrooms.isShared,
    isFormValid: selector.registerIsValid.isValid,
  }));

  //* useEffect
  useEffect(() => {
    if (bathCount) {
      dispatch(registerFormValidAction.setValid(true));
    }
    if (!bathCount) {
      isFormValid && dispatch(registerFormValidAction.setValid(false));
    }
  }, [bathCount, isFormValid]);

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
  const isBathShared = useCallback((isShared: boolean) => {
    if (isShared) dispatch(registerRyokanActions.setIsBathShared(true));
    if (!isShared) dispatch(registerRyokanActions.setIsBathShared(false));
  }, []);

  return (
    <div className="w-full h-outOfHeader col-start-2 register-form animate-fadeInAndUpForm space-y-5 overflow-auto">
      <div className="w-1/2 h-full text-black mx-auto my-0 py-5 flex flex-col justify-center">
        <div className="w-full mb-5">
          <span className="mb-3 inline-block text-2xl">욕실 수</span>
          <div className="flex-none w-32 flex justify-around items-center">
            <button
              className={`w-10 h-10 border-2 ${
                !bathCount ? 'border-gray-500 text-gray-500' : 'border-emerald'
              }  rounded-full`}
              value="sub"
              onClick={bathCountAddOrSub}
              disabled={!bathCount}
            >
              -
            </button>
            <span>{bathCount}</span>
            <button
              className="w-10 h-10 border-2 rounded-full border-emerald"
              value="add"
              onClick={bathCountAddOrSub}
            >
              +
            </button>
          </div>
        </div>
        <div className="w-full">
          <span className="mb-3 inline-block text-2xl">공용 욕실인가요?</span>
          <div className="space-y-3">
            <div>
              <label className=" inline-flex items-center p-0">
                <input
                  className="form-radio text-emerald border-2 border-gray-400 w-6 h-6"
                  type="radio"
                  name="sharedBathroomRadio"
                  onChange={() => {
                    isBathShared(true);
                  }}
                  checked={isShared}
                  cy-testid="share"
                />
                <span className="ml-2 font-xl">예, 공용 욕실입니다.</span>
              </label>
            </div>
            <div>
              <label className="inline-flex items-center p-0">
                <input
                  className="form-radio text-emerald border-2 border-gray-400 w-6 h-6"
                  type="radio"
                  name="sharedBathroomRadio"
                  onChange={() => {
                    isBathShared(false);
                  }}
                  checked={!isShared}
                  cy-testid="non-share"
                />
                <span className="ml-2 font-xl">
                  아니요, 게스트가 단독으로 사용합니다.
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterRyokanBathrooms;
