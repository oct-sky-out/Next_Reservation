import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerRyokanActions } from 'store/registerRyokan';
import { v4 } from 'uuid';
import { GrClose } from 'react-icons/gr';
import Selector from '@/components/common/Selector';
import { bedroomType } from 'types/reduxActionTypes/ReduxRegiserRyokanType';
import { BedTypes } from 'lib/staticData/RegisterRyokanBedrooms';

interface IProps {
  closeModal: () => void;
  bedrooms: bedroomType[];
  roomNumber: number;
}

const AddBedeList: React.FC<IProps> = ({
  closeModal,
  bedrooms,
  roomNumber,
}) => {
  //* Redux
  const dispatch = useDispatch();

  //* useState
  const [bedSelctorValue, setBedSelectorValue] = useState('다른 침대 선택');
  const [copyBedrooms, setCopyBedroom] = useState<bedroomType[]>(bedrooms);

  //* useCallback
  const changedBedSelectorValue = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
      setBedSelectorValue(value);
      return () => {
        const typeKey = Object.keys(BedTypes).find(
          (key) => BedTypes[key] === value
        );
        if (typeKey) {
          const isAvailableBed = copyBedrooms.reduce((isAvailableBed, bed) => {
            if (bed.bedType === typeKey) return true;
            return isAvailableBed;
          }, false);
          isAvailableBed ||
            setCopyBedroom(
              [...copyBedrooms].concat({ bedType: typeKey, count: 0 })
            );
        }
      };
    },
    [copyBedrooms]
  );
  const deletedBedSelectorValue = useCallback(
    (bedIndex: number) =>
      setCopyBedroom([...copyBedrooms].filter((bed, idx) => idx !== bedIndex)),
    [copyBedrooms]
  );
  const changedBedCount = useCallback(
    (
      { currentTarget: { value } }: React.MouseEvent<HTMLButtonElement>,
      bedIndex: number
    ) => {
      const bedroomsValue = [...copyBedrooms];
      if (value === 'add') {
        bedroomsValue[bedIndex] = {
          ...bedroomsValue[bedIndex],
          count: bedroomsValue[bedIndex].count + 1,
        };
      }
      if (value === 'sub')
        bedroomsValue[bedIndex] = {
          ...bedroomsValue[bedIndex],
          count: bedroomsValue[bedIndex].count - 1,
        };
      setCopyBedroom([...bedroomsValue]);
    },
    [copyBedrooms]
  );
  const bedRegisterOrModifyEnded = () => {
    dispatch(
      registerRyokanActions.setBedroom({
        bedroom: copyBedrooms,
        roomNumber: roomNumber - 1,
      })
    );
    closeModal();
  };
  //* useMemo
  const isComplete = useMemo(() => {
    return copyBedrooms.reduce((complete, bed) => {
      console.log(bed.count);
      if (!bed.count) return true;
      return complete;
    }, false);
  }, [copyBedrooms]);
  return (
    <div className="w-full h-full bg-gray-900 bg-opacity-75 flex justify-center items-center text-black">
      <div className="w-1/2 h-3/4 relative p-10 bg-white rounded-lg animate-fadeInAndUpForm overflow-scroll">
        <GrClose
          size="24"
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeModal}
        />
        <div>
          <span className="text-2xl inline-block mb-5">
            {roomNumber}번 침실
          </span>
        </div>
        {copyBedrooms.map((bed, bedIndex) => {
          return (
            <div key={v4()} className="flex items-center mb-5">
              <div className="flex-none w-10 ">
                <GrClose
                  size="20"
                  className="cursor-pointer text-red-500"
                  onClick={() => {
                    deletedBedSelectorValue(bedIndex);
                  }}
                />
              </div>
              <div className="flex-1 text-lg">
                <span>{BedTypes[bed.bedType]}</span>
              </div>
              <div className="flex-none w-32 flex justify-around items-center">
                <button
                  className={`w-10 h-10 border-2 ${
                    !bed.count
                      ? 'border-gray-500 text-gray-500'
                      : 'border-emerald'
                  }  rounded-full`}
                  onClick={(e) => changedBedCount(e, bedIndex)}
                  value="sub"
                  disabled={!bed.count}
                >
                  -
                </button>
                <span>{bed.count}</span>
                <button
                  className="w-10 h-10 border-2 rounded-full border-emerald"
                  onClick={(e) => changedBedCount(e, bedIndex)}
                  value="add"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
        <div className="mb-10">
          <Selector
            disableOption="다른 침대 추가"
            value={bedSelctorValue}
            options={Object.values(BedTypes)}
            onChange={(e) => changedBedSelectorValue(e)()}
          />
        </div>
        <div className="absolute pr-20 w-full w-full">
          <div className="h-20">
            <button
              onClick={bedRegisterOrModifyEnded}
              className="btn btn-success w-full h-10"
              disabled={isComplete}
            >
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBedeList;
