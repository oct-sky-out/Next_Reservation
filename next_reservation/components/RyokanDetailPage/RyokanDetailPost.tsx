import findTruthyAmenities from '@/lib/utils/findTruthyAmenities';
import findTruthyConveniences from '@/lib/utils/findTruthyConveniences';
import { useSelector } from '@/store/index';

const RyokanDetailPost = () => {
  const postDatas = useSelector((state) => ({
    title: state.ryokanDetail.title,
    description: state.ryokanDetail.description,
    ryokanType: state.ryokanDetail.ryokanType,
    buildingType: state.ryokanDetail.buildingType,
    amenities: state.ryokanDetail.amenities,
    convenienceSpaces: state.ryokanDetail.convenienceSpaces,
    location: state.ryokanDetail.location,
    isBuiltInOnsen: state.ryokanDetail.isBuiltInOnsen,
  }));

  return (
    <div>
      <div>
        <h1>{postDatas.title}</h1>
        <span>{postDatas.location.address}</span>
      </div>
      <div>
        <h3>료칸 유형 : {postDatas.ryokanType}</h3>
        <span>건물 유형 :{postDatas.buildingType}</span>
        <span>실내 온천여부 : {postDatas.isBuiltInOnsen}</span>
      </div>
      <div>
        <div>
          <h3>편의 시설 : {findTruthyAmenities(postDatas.amenities)}</h3>
          <h3>
            편의 공간 : {findTruthyConveniences(postDatas.convenienceSpaces)}
          </h3>
        </div>
      </div>
      <div>{postDatas.description}</div>
    </div>
  );
};

export default RyokanDetailPost;
