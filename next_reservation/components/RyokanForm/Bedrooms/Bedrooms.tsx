import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { ryokanFormActions } from '@/store/ryokanForm';
import Selector from '@/components/common/Selector';
import useDidMounted from '@/components/hooks/useDidMounted';
import BedroomList from './BedroomList';
import { BedroomCount } from '@/lib/staticData/RegisterRyokanBedrooms';

const RegisterRyokanBeedrooms = () => {
  //* Redux
  const dispatch = useDispatch();
  const { bedroomList, bedroomCount, personnel } = useSelector((selector) => ({
    bedroomList: selector.ryokanForm.bedrooms.bedroomList,
    bedroomCount: selector.ryokanForm.bedrooms.bedroomCount,
    personnel: selector.ryokanForm.bedrooms.personnel,
  }));

  //* useRef
  const didMounted = useDidMounted();

  // * useEffect
  useEffect(() => {
    if (!didMounted) {
      dispatch(ryokanFormActions.setBedroomCount(bedroomCount));
    }
  }, [didMounted]);

  //* any Functions
  const makingBedList = (count: number) => {
    return count > Object.keys(bedroomList).length
      ? Array(count)
          .fill(0)
          .reduce(
            (prv, _cur, index) => {
              if (Object.keys(prv).length - 1 < index) {
                return Object.assign(
                  { ...prv },
                  { ['bedroom' + index]: [{ bedType: 'single', count: 0 }] }
                );
              }
              return { ...prv };
            },
            { ...bedroomList }
          )
      : Object.entries(bedroomList)
          .slice(0, count)
          .reduce((prv, cur) => {
            return Object.assign(prv, { [cur[0]]: cur[1] });
          }, {});
  };

  //* useCallbacks
  const personnelAddOrSub = useCallback(
    ({ currentTarget: { value } }: React.MouseEvent<HTMLButtonElement>) => {
      if (value === 'add')
        dispatch(ryokanFormActions.setPersonnel(personnel + 1));
      if (value === 'sub')
        dispatch(ryokanFormActions.setPersonnel(personnel - 1));
    },
    [personnel]
  );
  const selectBedroomCounted = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
      const count = value.match(/([\d])+/g);
      if (count) {
        dispatch(ryokanFormActions.setBedroomCount(+count[0]));
        dispatch(
          ryokanFormActions.setBedroomList({
            bedrooms: makingBedList(+count[0]),
          })
        );
      }
    },
    [bedroomCount, bedroomList]
  );

  return (
    <>
      <div className="w-full h-outOfHeader col-start-2 register-form animate-fadeInAndUpForm space-y-5 mx-0 my-auto overflow-auto">
        <div className=" flex flex-col justify-center py-5">
          <div className="w-1/2 my-0 mx-auto">
            <span className="text-black mb-3 inline-block text-2xl">
              ?????? ?????? ??????
            </span>
            <div className="text-black mb-5 space-x-3 select-maximum-personnel">
              <button
                className={`w-10 h-10 border-2 ${
                  !personnel
                    ? 'border-gray-500 text-gray-500'
                    : 'border-emerald'
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
              ???????????? ?????? ????????? ??????????????? ???????????????.
            </span>
            <Selector
              className="mb-5 h-20 ryokan-bedroom-count-selector"
              disableOption="??????????????? ??????????????????."
              onChange={selectBedroomCounted}
              value={`?????? ${bedroomCount}???`}
              options={BedroomCount}
            />
          </div>
          <div className="w-1/2 my-0 mx-auto">
            <div className="list-group mb-5 flex justify-center">
              <span className="text-black mb-3 inline-block text-2xl">
                ????????????
              </span>
              <span className="text-black mb-3 inline-block text-lg">
                ?????? ???????????? ???????????? ????????? ??? ????????? ????????? ?????????
                ????????????????????? ??????????????????.
              </span>
              <BedroomList bedroomList={bedroomList} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterRyokanBeedrooms;
