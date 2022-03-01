import MyPageMenu from '../MyPageMenu';
import AccountChangePassword from './AccountChangePassword';
import AccountDeleteButton from './AccountDeleteButton';
import AccountInformation from './AccountInformation';

const Account = () => {
  return (
    <div className="text-black">
      <div className="w-2/3 mx-auto mt-10 space-x-3 flex justify-center">
        <MyPageMenu />
      </div>
      <h1 className="w-2/3 mx-auto text-3xl my-10">내 정보 수정</h1>
      <div className="w-2/3 mx-auto border-2 border-solid border-emerald rounded-lg p-5">
        <div className="flex flex-col items-center space-y-10">
          <AccountInformation />
          <AccountChangePassword />
          <AccountDeleteButton />
        </div>
      </div>
    </div>
  );
};

export default Account;
