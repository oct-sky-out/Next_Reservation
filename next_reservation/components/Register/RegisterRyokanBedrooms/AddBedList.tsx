import React, { useCallback, useState } from 'react';
import { v4 } from 'uuid';
import { GrClose } from 'react-icons/gr';
import { bedroomType } from 'types/reduxActionTypes/ReduxRegiserRyokanType';
import { BedTypes } from 'lib/staticData/RegisterRyokanBedrooms';
import Selector from '@/components/common/Selector';

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
  const [bedSelctorValue, setBedSelectorValue] = useState('다른 침대 선택');
  const [copyBedrooms, setCopyBedrooms] = useState<bedroomType[]>(bedrooms);

  //* useCallback
  const changedBedSelectorValue = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
      setBedSelectorValue(value);
    },
    [bedSelctorValue]
  );
  return (
    <div className="w-full h-full bg-gray-900 bg-opacity-75 flex justify-center items-center text-black">
      <div className="w-1/2 h-1/2 relative p-10 bg-white rounded-lg animate-fadeInAndUpForm overflow-scroll">
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
        {bedrooms.map((bed) => {
          return (
            <div key={v4()} className="flex items-center mb-3">
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
                  value="sub"
                  disabled={!bed.count}
                >
                  -
                </button>
                <span>{bed.count}</span>
                <button
                  className="w-10 h-10 border-2 rounded-full border-emerald"
                  value="add"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
        <div>
          <Selector
            disableOption="다른 침대 추가"
            value={bedSelctorValue}
            options={Object.values(BedTypes)}
            onChange={changedBedSelectorValue}
          />
        </div>
        <div className="relative">
          <div className="absolute w-full h-20 top-52 w-full bottom-5">
            <button className="btn btn-success w-full">완료</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBedeList;
