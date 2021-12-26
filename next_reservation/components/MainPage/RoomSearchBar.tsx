import { AiOutlineSearch } from 'react-icons/ai';
import DatePicker from '@/components/common/DatePicker';

const RoomSearchBar = () => {
  return (
    <div className="w-1/2 bg-white rounded-full absolute top-6 left-1/4 flex justify-between text-black">
      <div className="rounded-full px-4 py-2  hover:bg-gray-100">
        <span className="text-sm">위치</span>
        <input
          type="text"
          className="form-control h-8 mt-1 p-2 w-full border-0"
          placeholder="위치입력"
        />
      </div>
      <div className="rounded-full py-2 px-4 hover:bg-gray-100">
        <span className="text-sm">체크인</span>
        <DatePicker
          className="form-control w-full h-8 p-2 mt-1 border-0"
          selected={null}
          placeholderText="체크인 날짜입력"
          onChange={() => {}}
        />
      </div>
      <div className="rounded-full py-2 px-4 hover:bg-gray-100">
        <span className="text-sm">체크아웃</span>
        <DatePicker
          className="form-control w-full h-8 p-2 mt-1 border-0"
          selected={null}
          placeholderText="체크인 날짜입력"
          onChange={() => {}}
        />
      </div>
      <div className="rounded-full py-2 px-4 mt-1  hover:bg-gray-100">
        <span className="text-sm">인원</span>
        <input
          type="text"
          className="form-control w-full h-8 border-0 p-2"
          placeholder="인원수 추가"
        />
      </div>
      <div className="w-10 m-3 rounded-full bg-emerald flex justify-center items-center flex-none text-white cursor-pointer">
        <AiOutlineSearch size="24" />
      </div>
    </div>
  );
};

export default RoomSearchBar;
