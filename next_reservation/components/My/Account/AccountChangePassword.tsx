const AccountChangePassword = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center space-y-5">
        <div>
          <h3 className="text-2xl">비밀번호 변경</h3>
        </div>
        <div className="w-1/3">
          <h4 className="text-xl">새로운 비밀번호</h4>
          <input
            type="password"
            className="w-full border-b-2 border-solid border-emerald text-green-600 p-1 text-xl text-align"
          />
        </div>
        <div className="w-1/3">
          <h4 className="text-xl">비밀번호 확인</h4>
          <input
            type="password"
            className="w-full border-b-2 border-solid border-emerald text-green-600 p-1 text-xl text-align"
          />
        </div>
        <div>
          <button className="rounded-full p-3 w-48 bg-green-600 text-white">
            비밀번호 변경
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountChangePassword;
