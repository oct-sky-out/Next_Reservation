import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { searchRoomActions } from '@/store/searchRoom';
import { v4 } from 'uuid';
import axios from '@/lib/api';

const RecommendationRegion = () => {
  const urlsAndRegionName = [
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/next-reservation.appspot.com/o/mainpage%2Fseoul.jpg?alt=media&token=1d91ddee-5eb4-49b3-a56e-08784f2abea0',
      region: '서울',
    },
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/next-reservation.appspot.com/o/mainpage%2Fbusan.jpg?alt=media&token=f353fdda-644f-45d2-8753-d27e23307b69',
      region: '부산',
    },

    {
      url: 'https://firebasestorage.googleapis.com/v0/b/next-reservation.appspot.com/o/mainpage%2Fgwangju.jpg?alt=media&token=242127c2-7ba5-4b59-b4da-a3be13aa0d85',
      region: '광주',
    },

    {
      url: 'https://firebasestorage.googleapis.com/v0/b/next-reservation.appspot.com/o/mainpage%2Fjeju.jpg?alt=media&token=1d268124-89f7-414e-bf62-8b56531674bc',
      region: '제주',
    },
  ];

  const router = useRouter();
  const dispatch = useDispatch();

  const regionCardClick = async (region: string) => {
    dispatch(searchRoomActions.setLocation(region));
    const { data } = await axios.get('/api/maps/placeLocation', {
      params: { address: region },
    });
    dispatch(searchRoomActions.setLatitude(data.lng));
    dispatch(searchRoomActions.setLongitude(data.lat));
    router.push(`/room/search?place=${region}`);
  };

  return (
    <div className="w-full p-10">
      <div className="flex flex-wrap justify-around items-center">
        {urlsAndRegionName.map((region, index) => (
          <div
            key={v4()}
            cy-test={`recommend-place-${index}`}
            className="items-center mx-2 border-4 border-solid border-emerald w-1/5 p-2 rounded-xl transition ease-in-out transform translate-y-0 hover:-translate-y-25 hover:scale-110 duration-300 cursor-pointer"
            onClick={() => regionCardClick(region.region)}
          >
            <img
              className="w-full h-300 rounded-xl object-cover object-bottom"
              src={region.url}
              alt={region.region}
            />
            <div className="w-full py-2">
              <span className="text-3xl my-auto">{region.region}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationRegion;
