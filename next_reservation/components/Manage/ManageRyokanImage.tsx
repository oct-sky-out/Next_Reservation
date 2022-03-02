import { photoType } from '@/types/reduxActionTypes/ReduxRyokanType';

interface IManageRyokanImage {
  image: photoType;
}

const ManageRyokanImage: React.FC<IManageRyokanImage> = ({ image }) => {
  return (
    <img
      className="w-300 h-200 object-cover object-center"
      src={image.photoUrl}
      alt={image.photoUrl}
    />
  );
};

export default ManageRyokanImage;
