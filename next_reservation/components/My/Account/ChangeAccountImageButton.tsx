import ChangeImageButton from './ImageButtons/ChangeImageButton';
import DefualtImageButton from './ImageButtons/DefualtImageButton';
import UploadImageButton from './ImageButtons/UploadImageButton';

interface IChangeAccountImageButton {
  imageSrc: string;
}

const ChangeAccountImageButton: React.FC<IChangeAccountImageButton> = ({
  imageSrc,
}) => {
  const isImageInFirebaseBucket = () => imageSrc.includes('firebase');
  return (
    <>
      {isImageInFirebaseBucket() ? (
        <div className="w-full flex justify-around">
          <ChangeImageButton imageSrc={imageSrc} />
          <DefualtImageButton imageSrc={imageSrc} />
        </div>
      ) : (
        <div className="flex justify-center">
          <UploadImageButton />
        </div>
      )}
    </>
  );
};

export default ChangeAccountImageButton;
