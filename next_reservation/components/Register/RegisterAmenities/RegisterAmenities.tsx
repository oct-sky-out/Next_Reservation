import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { registerRyokanActions } from '@/store/registerRyokan';
import { registerFormValidAction } from '@/store/registerFormIsValid';
import { v4 } from 'uuid';
import useDidMounted from '@/components/hooks/useDidMounted';
import CheckBox from '@/components/common/CheckBox';
import Amenities from '@/lib/staticData/Amenities';

const RegisterAmenities = () => {
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

  //* useCallback
  const checkedAmenity = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>, index: number) => {
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
    <div className="w-full text-black h-outOfHeader col-start-2 register-form animate-fadeInAndUpFor register-form overflow-auto">
      <div className="w-1/3 h-full mx-auto my-0 relative py-5">
        <div className="w-full absolute top-1/2 transform -translate-y-1/2 h-2/3 mx-0 my-auto space-y-10">
          <h1 className="text-2xl">료칸의 편의시설을 선택해주세요.</h1>
          <div>
            <div className="w-full flex flex-col justify-around space-y-5">
              {Object.entries(Amenities).map((amenity, index) => (
                <CheckBox
                  id="amenity"
                  key={v4()}
                  labelText={amenity[1]}
                  value={amenity[1]}
                  checked={amenities[amenitiesKeys[index]]}
                  onChange={(e) => checkedAmenity(e, index)}
                  className="justify-self-stretch"
                  labelClassName={`${index}-${amenity[0]}`}
                  data-testid={`${index}-${amenity[0]}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAmenities;
