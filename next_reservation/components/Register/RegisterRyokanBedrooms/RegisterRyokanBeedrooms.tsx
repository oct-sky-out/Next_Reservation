import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { v4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../store';
import { registerRyokanActions } from '../../../store/registerRyokan';
import { registerFormValidAction } from '../../../store/registerFormIsValid';
import Selector from '../../../components/common/Selector';
import {
  BedTypes,
  BedroomCount,
} from '../../../lib/staticData/RegisterRyokanBedrooms';
import useDidMounted from '../../hooks/useDidMounted';
import { bedroomType } from 'types/reduxActionTypes/ReduxRegiserRyokanType';
import useModal from '@/components/hooks/useModal';

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
  //* custom hooks
  const { ModalPotal, closeModal, openModal } = useModal();

  //* useRef
  const didMounted = useDidMounted();

  // * useEffect
  useEffect(() => {
    if (!didMounted) {
      dispatch(registerFormValidAction.setValid(false));
    }
  }, [didMounted]);

  //* any Functions
  const makingBedList = (count: number) => {
    return count > bedroomList.length
      ? [...bedroomList].concat(
          [...Array(count - bedroomList.length)].fill([
            { bedType: '', count: 0 },
          ])
        )
      : [...bedroomList.slice(0, count)];
  };

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
      if (count) {
        dispatch(registerRyokanActions.setBedroomCount(+count[0]));
        dispatch(
          registerRyokanActions.setBedroomList({
            bedrooms: makingBedList(+count[0]),
          })
        );
      }
    },
    [bedroomCount, bedroomList]
  );
  //* any Functions
  const isAvailableBed = useCallback(
    (bedroom: bedroomType) => {
      return bedroom.count
        ? `${BedTypes[bedroom.bedType]} ${bedroom.count}개`
        : '침대가 비어있습니다.';
    },
    [personnel]
  );
  //* useMemo
  const getBedroomList = useMemo(
    () =>
      bedroomList.map((bedrooms, bedroomNumber) => {
        return (
          <div key={v4()} className="text-black py-5 px-3">
            <div className="flex flex-col relative">
              <span className="text-xl inline-block">
                {bedroomNumber + 1}번 침실
              </span>
              {bedrooms.map((bedroom) => {
                return (
                  <span className="text-base inline-block" key={v4()}>
                    {isAvailableBed(bedroom)}
                  </span>
                );
              })}
              <button className="absolute right-0 top-1/3 btn  btn-outline-success">
                침대 추가하기
              </button>
            </div>
          </div>
        );
      }),
    [bedroomList, bedroomCount]
  );

  return (
    <>
      <div className="w-full col-start-2 register-form animate-fadeInAndUpForm space-y-5 mx-0 my-auto">
        <div className="w-1/2 my-0 mx-auto">
          <span className="text-black mb-3 inline-block text-2xl">
            최대 숙박 인원
          </span>
          <div className="text-black mb-5 space-x-3">
            <button
              className={`w-10 h-10 border-2 ${
                !personnel ? 'border-gray-500 text-gray-500' : 'border-emerald'
              }  rounded-full`}
              value="sub"
              onClick={personnelAddOrSub}
              disabled={!personnel}
            >
              -
            </button>
            <span>{personnel}</span>
            <button
              className="w-10 h-10 border-2 border-emerald rounded-full"
              value="add"
              onClick={personnelAddOrSub}
            >
              +
            </button>
          </div>
        </div>
        <div className="w-1/2 my-0 mx-auto">
          <span className="text-black mb-3 inline-block text-2xl">
            게스트가 사용 가능한 침실개수를 정해주세요.
          </span>
          <Selector
            className="mb-5 h-20 ryokan-bedroom-count-selector"
            disableOption="침실개수를 선택해주세요."
            onChange={selectBedroomCounted}
            value={`침실 ${bedroomCount}개`}
            options={BedroomCount}
          />
        </div>
        <div className="w-1/2 my-0 mx-auto">
          <div className="list-group mb-5 flex justify-center">
            <span className="text-black mb-3 inline-block text-2xl">
              침대유형
            </span>
            <span className="text-black mb-3 inline-block text-lg">
              모든 게스트가 편안하게 숙박할 수 있도록 침대가 충분히
              구비되어있는지 확인해주세요.
            </span>
            <div className="divide-solid divide-y divide-gray-300 border-t border-b border-solid border-gray-300">
              {getBedroomList}
            </div>
          </div>
        </div>
      </div>
      <ModalPotal>{}</ModalPotal>
    </>
  );
};

export default RegisterRyokanBeedrooms;
