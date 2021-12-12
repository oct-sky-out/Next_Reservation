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
          <h1 className="text-2xl">료칸의 편의시설을 선택해주세요.</h1>
          <div>
            <div className="w-full flex flex-col justify-around space-y-5">
              {Object.entries(ConvenienceSpaces).map(
                (convenienceSpace, index) => (
                  <CheckBox
                    id="amenity"
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

export default RegisterConvenienceSpaces;
