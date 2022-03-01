const ManageButtons = () => {
  return (
    <div className="space-x-3 text-white absolute right-0 bottom-0">
      <button className="w-36 px-3 py-2 rounded-full border-solid border-2 border-emerald bg-emerald">
        정보수정
      </button>
      <button className="w-36 px-3 py-2 rounded-full border-solid border-2 border-red-400 bg-red-400 ">
        삭제
      </button>
    </div>
  );
};

export default ManageButtons;
