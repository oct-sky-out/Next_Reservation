import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { searchRoomActions } from '@/store/searchRoom';
import { AiOutlineSearch } from 'react-icons/ai';
import Swal from 'sweetalert2';
import GuestCountMenu from '../common/GuestCountMenu';
import RecommendationPlace from './RecommendationPlace';
import DatePicker from '@/components/common/DatePicker';

const RoomSearchBar = () => {
  const router = useRouter();
  const {
    location,
    checkInDate,
    checkOutDate,
    adultCount,
    childrenCount,
    infantsCount,
  } = useSelector((selector) => ({
    location: selector.searchRoom.location,
    checkInDate: selector.searchRoom.checkInDate,
    checkOutDate: selector.searchRoom.checkOutDate,
    adultCount: selector.searchRoom.adultCount,
    childrenCount: selector.searchRoom.childrenCount,
    infantsCount: selector.searchRoom.infantsCount,
  }));
  const dispatch = useDispatch();

  const [isGuestCountMenuOpend, setIsGuestCountMenuOpend] = useState(false);
  const [openRecommenationPalce, setOpenRecommenationPalce] = useState(false);

  const clickSearchButton = () => {
    if (
      location &&
      checkInDate &&
      checkOutDate &&
      (adultCount || childrenCount || infantsCount)
    )
      router.push(`/room/search?place=${location}`);
    else
      Swal.fire({
        title: '검색항목이 부족합니다.',
        text: '검색항목이 부족합니다. 검색항목 중 빠진것이 없는지 확인해주세요!',
        icon: 'warning',
      });
  };

  return (
    <div className="w-2/3 bg-white rounded-full mx-auto my-5 text-black flex justify-between">
      <div className="w-1/5 rounded-full px-4 py-2 inline-block hover:bg-gray-100 relative">
        <RecommendationPlace
          openRecommenationPalce={openRecommenationPalce}
          setOpenRecommenationPalce={setOpenRecommenationPalce}
        />
      </div>
      <div className="w-1/5 rounded-full inline-block py-2 px-4 hover:bg-gray-100">
        <span className="text-sm">체크인</span>
        <DatePicker
          data-testid="check-in-input"
          className="form-control w-full h-8 p-2 mt-1 border-0"
          selected={checkInDate}
          placeholderText="체크인 날짜입력"
          minDate={new Date()}
          onChange={(date) => {
            dispatch(searchRoomActions.setCheckInDate(date));
          }}
        />
      </div>
      <div className="w-1/5 rounded-full inline-block py-2 px-4 hover:bg-gray-100">
        <span className="text-sm">체크아웃</span>
        <DatePicker
          data-testid="check-out-input"
          className="form-control w-full h-8 p-2 mt-1 border-0"
          selected={checkOutDate}
          minDate={checkInDate || new Date()}
          placeholderText="체크아웃 날짜입력"
          onChange={(date) => {
            dispatch(searchRoomActions.setCheckOutDate(date));
          }}
        />
      </div>
      <div className="w-1/5 rounded-full inline-block py-2 px-4 hover:bg-gray-100">
        <span className="text-sm">인원</span>
        <GuestCountMenu
          isGusetCountMenuOpend={isGuestCountMenuOpend}
          setIsGusetCountMenuOpend={setIsGuestCountMenuOpend}
          adultCount={adultCount}
          childrenCount={childrenCount}
          infantsCount={infantsCount}
          setAdultCountAction={searchRoomActions.setAdultCount}
          setChildrenCountAction={searchRoomActions.setChildrenCount}
          setInfantsCountAction={searchRoomActions.setInfantsCount}
        >
          <input
            data-testid="guest-count-menu-text"
            type="text"
            className="form-control w-full h-8 border-0 p-2"
            placeholder="인원수 추가"
            defaultValue={`성인 ${adultCount}명, 어린이 : ${childrenCount}명, 영유아 : ${infantsCount}`}
            onClick={() => setIsGuestCountMenuOpend(true)}
          />
        </GuestCountMenu>
      </div>
      <div
        className="w-20 text-white cursor-pointer flex align-center"
        cy-test="search-btn"
        onClick={clickSearchButton}
      >
        <div className="w-20 rounded-full bg-emerald ml-auto mr-1 my-auto py-3">
          <AiOutlineSearch size="32" className="mx-auto my-0" />
        </div>
      </div>
    </div>
  );
};

export default RoomSearchBar;
