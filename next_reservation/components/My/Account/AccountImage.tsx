import { useSelector } from '@/store/index';
import ChangeAccountImageButton from './ChangeAccountImageButton';

const AccountImage = () => {
  const userPicture = useSelector((store) => store.user.data.userPicture);
  return (
    <>
      <h3 className="text-2xl">사진</h3>
      <div className="flex justify-center">
        <img
          className="w-200 h-200 object-contain rounded-full border-solid border-emerald border-4 p-1"
          src={
            userPicture ||
            '/_next/static/image/public/static/user/default_user_picture.0864b7391dea61a6ccfc62059ab89fd2.png'
          }
        />
      </div>
      <ChangeAccountImageButton imageSrc={userPicture} />
    </>
  );
};

export default AccountImage;
