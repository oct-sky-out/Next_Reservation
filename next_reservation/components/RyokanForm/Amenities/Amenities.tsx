import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { ryokanFormActions } from '@/store/ryokanForm';
import { registerFormValidAction } from '@/store/registerFormIsValid';
import { v4 } from 'uuid';
import CheckBox from '@/components/common/CheckBox';
import AmenitiesSelector from '@/lib/staticData/Amenities';
import { amenitiesType } from '@/types/reduxActionTypes/ReduxRyokanType';

const Amenities = () => {
  //* Redux
  const dispatch = useDispatch();
  const amenities = useSelector((selector) => selector.ryokanForm.amenities);

  // * useEffect
  useEffect(() => {
    dispatch(registerFormValidAction.setValid(true));
  }, []);

  const amenitiesKeys: Required<keyof amenitiesType>[] = [
    'breakfast',
    'closet',
    'coolingEquipment',
    'heatingEquipment',
    'internet',
    'toiletries',
    'hairdryer',
    'tv',
  ];

  //* useCallback
  const checkedAmenity = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>, index: number) => {
      dispatch(
        ryokanFormActions.setAmenities({
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
              {Object.entries(AmenitiesSelector).map((amenity, index) => (
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

export default Amenities;
