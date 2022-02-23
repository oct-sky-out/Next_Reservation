import findTruthyAmenities from '@/lib/utils/findTruthyAmenities';
import findTruthyConveniences from '@/lib/utils/findTruthyConveniences';
import { useSelector } from '@/store/index';
import { IoLocationSharp } from 'react-icons/io5';
import {
  MdOutlineBedroomParent,
  MdOutlineApartment,
  MdOutlineHotTub,
  MdOutlineCoffee,
  MdOutlineChair,
} from 'react-icons/md';
import RyokanLocation from './RyokanLocation';
import ReservationForm from './ReservationForm';
import {
  RyokanType as RyokanTypes,
  BuildingType as BuildingTypes,
} from '@/lib/staticData/RegisterRyokanType';

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
    pricePerDay: state.ryokanDetail.pricePerDay,
  }));
  const { pricePerDay, location } = postDatas;
  return (
    <div className="w-full h-1/3">
      <div className="w-400 h-300 fixed top-44 right-14 space-y-3">
        <h1 className="text-4xl">{postDatas.title}</h1>
        <span className="text-lg flex items-center space-x-3">
          <IoLocationSharp size="24" color="#138a6c" />
          {postDatas.location.address}
        </span>
        <RyokanLocation
          markerInformations={[
            {
              pricePerDay: pricePerDay,
              latitude: location.latitude,
              longitude: location.longitude,
            },
          ]}
        />
        <ReservationForm />
      </div>
      <div className="px-3 divide-y-2 divide-emerald divide-solid mt-20 border-2 border-emerald rounded border-solid">
        <div className="text-lg flex flex-wrap space-y-1 py-3">
          <div className="w-1/2 flex items-center space-x-3">
            <MdOutlineBedroomParent size="30" color="#138a6c" />
            <span>{RyokanTypes[postDatas.ryokanType]}</span>
          </div>
          <div className="w-1/2 flex items-center space-x-3">
            <MdOutlineApartment size="30" color="#138a6c" />
            <span>{BuildingTypes[postDatas.buildingType]}</span>
          </div>
          <div className="w-1/2 flex items-center space-x-3">
            <MdOutlineHotTub size="30" color="#138a6c" />
            <span>(실내 온천)</span>
            <span>{postDatas.isBuiltInOnsen ? '있음' : '없음'}</span>
          </div>
        </div>
        <div className="py-3">
          <div className="flex flex-wrap">
            <div className="w-1/2 flex items-center space-x-3">
              <MdOutlineCoffee size="26" color="#138a6c" />
              <span>{findTruthyAmenities(postDatas.amenities)}</span>
            </div>
            <div className="w-1/2 flex items-center space-x-3">
              <MdOutlineChair size="26" color="#138a6c" />
              <span>{findTruthyConveniences(postDatas.convenienceSpaces)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 mt-3 space-y-3 ">
        <h3 className="text-2xl">료칸 소개</h3>
        <p className="text-lg">{postDatas.description}</p>
      </div>
    </div>
  );
};

export default RyokanDetailPost;
