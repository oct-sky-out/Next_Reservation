import { useSelector } from '@/store/index';
import AccountImage from './AccountImage';

const AccountInformation = () => {
  const account = useSelector((store) => store.user.data);

  return (
    <div className="w-full h-300">
      <div className="w-1/3 mx-auto flex space-y-5 space-x-10 justify-around">
        <div className="w-full h-full space-y-5">
          <AccountImage />
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
