import { useSelector } from '@/store/index';

const AccountInformation = () => {
  const account = useSelector((store) => store.user.data);

  return (
    <div className="w-full h-300">
      <div className="flex space-y-5 space-x-10 justify-center">
        <div className="w-200 h-200 space-y-5">
          <h3 className="text-2xl">사진</h3>
          <img
            className="w-full h-full object-contain rounded-full border-solid border-emerald border-4 p-1"
            src={account.userPicture.src}
          />
        </div>
        <div className="flex flex-col justify-center">
          <div>
            <h3 className="text-2xl">계정</h3>
            <span className="text-lg">{account.email}</span>
          </div>
          <div>
            <h3 className="text-2xl">이름</h3>
            <span className="text-lg">{account.name}</span>
          </div>
          <div>
            <h3 className="text-2xl">생년월일</h3>
            <span className="text-lg">
              {new Date(account.brithDay!).toLocaleString('ko-KR', {
                dateStyle: 'long',
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;
