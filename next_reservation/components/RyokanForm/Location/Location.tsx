import React from 'react';
import { useDispatch } from 'react-redux';
import { registerRyokanActions } from '@/store/registerRyokan';
import { FaLocationArrow } from 'react-icons/fa';
import { AiOutlineExclamation } from 'react-icons/ai';
import Swal from 'sweetalert2';
import axios from '@/lib/api';
import RegisterLocationForm from './LocationForm';
import { locationApiType, geocodingError } from '@/types/apiTyps/maps/location';

const RegisterLocation = () => {
  const dispatch = useDispatch();

  const successfulGetLocation = async (myLocation: GeolocationPosition) => {
    try {
      const { data } = await axios.get<locationApiType>('/api/maps/location', {
        params: {
          latitude: myLocation.coords.latitude,
          longitude: myLocation.coords.longitude,
        },
      });
      dispatch(registerRyokanActions.setAutoLocation(data));
    } catch (error: any | geocodingError) {
      Swal.fire({
        icon: 'error',
        title: '알 수 없는 위치',
        text: '알 수 없는 위치입니다.',
      });
    }
  };

  const failureGetLocation = (failError: GeolocationPositionError) => {
    if (failError.PERMISSION_DENIED)
      Swal.fire({
        icon: 'error',
        title: '위치 엑세스 거부.',
        text: '위치 엑세스가 거부되었습니다. 위치 엑세스를 켜주세요',
      });
    if (failError.POSITION_UNAVAILABLE)
      Swal.fire({
        icon: 'error',
        title: '알 수없는 위치.',
        text: '위치 정보를 알 수 없습니다.',
      });
    if (failError.TIMEOUT)
      Swal.fire({
        icon: 'error',
        title: '네트워크 시간 초과.',
        text: '네트워크 신호가 너무 약합니다.',
      });
  };
  const getMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      successfulGetLocation,
      failureGetLocation
    );
  };

  return (
    <div className="w-full h-outOfHeader col-start-2 animate-fadeInAndUpForm register-form text-black overflow-auto">
      <div className="w-2/3 flex flex-col justify-center mx-auto my-0 py-5">
        <div className="w-full">
          <span className="mb-3 text-2xl inline-block">
            위치를 선택해주세요.
          </span>
          <div className="mb-5">
            <button
              className="w-40 h-10 mb-3 rounded border-2 border-emerald flex justify-around items-center hover:bg-green-100"
              onClick={getMyLocation}
            >
              <FaLocationArrow color="#48cfae" />
              현재 위치 사용
            </button>
            <span className="flex ">
              <AiOutlineExclamation /> 위치는 게스트가 예약 한 후에만 볼 수
              있습니다.
            </span>
          </div>
          <RegisterLocationForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterLocation;
