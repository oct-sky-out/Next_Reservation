import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'store';
import { registerRyokanActions } from 'store/registerRyokan';
import { registerFormValidAction } from 'store/registerFormIsValid';
import { FaLocationArrow } from 'react-icons/fa';
import { AiOutlineExclamation } from 'react-icons/ai';
import RegisterLocationForm from './RegisterLocationForm';
import Swal from 'sweetalert2';

const RegisterLocation = () => {
  const dispatch = useDispatch();
  const {
    contry,
    city,
    district,
    streetAddress,
    detailAddress,
    postCode,
    latitude,
    longitude,
    isValud,
  } = useSelector((selector) => ({
    contry: selector.registerRyokan.location.contry,
    city: selector.registerRyokan.location.city,
    district: selector.registerRyokan.location.district,
    streetAddress: selector.registerRyokan.location.streetAddress,
    detailAddress: selector.registerRyokan.location.detailAddress,
    postCode: selector.registerRyokan.location.postCode,
    latitude: selector.registerRyokan.location.latitude,
    longitude: selector.registerRyokan.location.longitude,
    isValud: selector.registerIsValid.isValid,
  }));

  const successfulGetLocation = (myLocation: GeolocationPosition) => {
    console.log(myLocation.coords);
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
      <div className="w-1/3 flex flex-col justify-center mx-auto my-0 py-5">
        <div className="w-full">
          <span className="mb-3 text-2xl inline-block">
            위치를 선택해주세요.
          </span>
          <div className="mb-5">
            <button
              data-testid="personnel-sub"
              value="sub"
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
