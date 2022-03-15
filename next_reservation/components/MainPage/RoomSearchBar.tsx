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
  const searchRoomForm = useSelector((selector) => selector.searchRoom);
  const {
    adultCount,
    childrenCount,
    infantsCount,
    checkInDate,
    checkOutDate,
    location,
  } = searchRoomForm;
  const dispatch = useDispatch();

  const [isGuestCountMenuOpend, setIsGuestCountMenuOpend] = useState(false);
  const [openRecommenationPalce, setOpenRecommenationPalce] = useState(false);

  const clickSearchButton = () => {
    if (
      location &&
      checkInDate &&
      checkOutDate &&
      (adultCount || childrenCount || infantsCount)
    ) {
      localStorage.setItem('search', JSON.stringify({ ...searchRoomForm }));
      router.push(`/room/search?place=${location}`);
    } else
      Swal.fire({
        title: '검색항목이 부족합니다.',
        text: '검색항목이 부족합니다. 검색항목 중 빠진것이 없는지 확인해주세요!',
        icon: 'warning',
      });
  };

  return (
    <div className="w-full md:w-11/12 lg:w-2/3 h-1/3 md:h-16 bg-white rounded-full mx-auto my-5 text-black flex justify-between">
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
          className="form-control h-6 md:h-8 md:mt-1 md:p-2 w-full border-0 text-sm md:text-md "
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
          className="form-control h-6 md:h-8 md:mt-1 md:p-2 w-full border-0 text-sm md:text-md "
          selected={checkOutDate}
          minDate={checkInDate!}
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
          modalWrapperClassName="-left-64 lg:-left-10"
        >
          <input
            data-testid="guest-count-menu-text"
            type="text"
            className="form-control h-6 md:h-8 md:mt-1 md:p-2 w-full border-0 text-sm md:text-md "
            placeholder="인원수 추가"
            value={`성인 ${adultCount}명, 어린이 : ${childrenCount}명, 영유아 : ${infantsCount}`}
            onClick={() => setIsGuestCountMenuOpend(true)}
            readOnly
          />
        </GuestCountMenu>
      </div>
      <div
        className="w-20 text-white cursor-pointer flex align-center"
        cy-test="search-btn"
        onClick={clickSearchButton}
      >
        <div className="w-10 md:w-20 rounded-full bg-emerald ml-auto mr-3 md:mr-0 my-auto md:py-4">
          <AiOutlineSearch size="32" className="w-5 md:w-10 mx-auto my-0" />
        </div>
      </div>
    </div>
  );
};

export default RoomSearchBar;
