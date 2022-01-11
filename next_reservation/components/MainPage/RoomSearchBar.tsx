import { AiOutlineSearch } from 'react-icons/ai';
import DatePicker from '@/components/common/DatePicker';

const RoomSearchBar = () => {
  return (
    <div className="w-1/2 bg-white rounded-full mx-auto my-5 text-black flex justify-between">
      <div className="w-1/5 rounded-full px-4 py-2 inline-block hover:bg-gray-100">
        <span className="text-sm">위치</span>
        <input
          type="text"
          className="form-control h-8 mt-1 p-2 w-full border-0"
          placeholder="위치입력"
        />
      </div>
      <div className="w-1/5 rounded-full inline-block py-2 px-4 hover:bg-gray-100">
        <span className="text-sm">체크인</span>
        <DatePicker
          className="form-control w-full h-8 p-2 mt-1 border-0"
          selected={null}
          placeholderText="체크인 날짜입력"
          onChange={() => {}}
        />
      </div>
      <div className="w-1/5 rounded-full inline-block py-2 px-4 hover:bg-gray-100">
        <span className="text-sm">체크아웃</span>
        <DatePicker
          className="form-control w-full h-8 p-2 mt-1 border-0"
          selected={null}
          placeholderText="체크인 날짜입력"
          onChange={() => {}}
        />
      </div>
      <div className="w-1/5 rounded-full inline-block py-2 px-4 hover:bg-gray-100">
        <span className="text-sm">인원</span>
        <input
          type="text"
          className="form-control w-full h-8 border-0 p-2"
          placeholder="인원수 추가"
        />
      </div>
      <div className="w-20 text-white cursor-pointer flex align-center">
        <div className="w-20 rounded-full bg-emerald ml-auto mr-1 my-auto py-3 ">
          <AiOutlineSearch size="32" className="mx-auto my-0" />
        </div>
      </div>
    </div>
  );
};

export default RoomSearchBar;
