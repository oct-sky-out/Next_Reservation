import { useCallback, useState } from 'react';
import { v4 } from 'uuid';
import useModal from '@/components/hooks/useModal';
import AddBedList from './AddBedList';
import { BedTypes } from '@/lib/staticData/RegisterRyokanBedrooms';
import { bedroomType } from '@/types/reduxActionTypes/ReduxRegiserRyokanType';

interface IProps {
  bedroomList: bedroomType[][];
}
const BedroomList: React.FC<IProps> = ({ bedroomList }) => {
  //* useState
  const [bedrooms, setbedrooms] = useState<bedroomType[]>([]);
  const [roomNumber, setRoomNumber] = useState(0);

  //* custom hooks
  const { ModalPotal, closeModal, openModal } = useModal();

  //* useCallback
  const isAvailableBed = useCallback(
    (bedroom: bedroomType) => {
      return bedroom.count
        ? `${BedTypes[bedroom.bedType]} ${bedroom.count}개`
        : '침대가 비어있습니다.';
    },
    [bedroomList]
  );

  const AddOrChangingBedroom = useCallback(
    (bedroom: bedroomType[], roomNumber: number) => {
      setbedrooms([...bedroom]);
      setRoomNumber(roomNumber);
      openModal();
    },
    [bedrooms]
  );
  return (
    <>
      <div className="divide-solid divide-y divide-gray-300 border-t border-b border-solid border-gray-300 bedrooms-list-wrapper">
        {bedroomList.map((bedrooms, bedroomNumber) => {
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
                <button
                  className="absolute right-0 top-1/3 btn btn-outline-success add-or-modifiy-bed-btn"
                  onClick={() => {
                    AddOrChangingBedroom(bedrooms, bedroomNumber + 1);
                  }}
                >
                  침대 추가/수정하기
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <ModalPotal>
        <AddBedList
          closeModal={closeModal}
          bedrooms={bedrooms}
          roomNumber={roomNumber}
        />
      </ModalPotal>
    </>
  );
};

export default BedroomList;
