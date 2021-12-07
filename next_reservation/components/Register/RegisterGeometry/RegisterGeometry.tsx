import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'store';
import { registerRyokanActions } from 'store/registerRyokan';
import { registerFormValidAction } from 'store/registerFormIsValid';
import { Loader } from '@googlemaps/js-api-loader';
import L from 'lodash';
import useDidMounted from '@/components/hooks/useDidMounted';

const RegisterGeometry = () => {
  const dispatch = useDispatch();
  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '',
    version: 'weekly',
  });

  const mapRef = useRef<HTMLDivElement>(null);
  const latitude = useSelector(
    (selector) => selector.registerRyokan.location.latitude
  );
  const longitude = useSelector(
    (selector) => selector.registerRyokan.location.longitude
  );

  const didMounted = useDidMounted();

  // * useEffect
  useEffect(() => {
    if (!didMounted) {
      dispatch(registerFormValidAction.setValid(true));
    }
  }, [didMounted]);

  useEffect(() => {
    loader.load().then(() => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: {
            lat: latitude || 37.550948,
            lng: longitude || 126.990954,
          },
          zoom: 17,
          fullscreenControl: false,
          streetViewControl: false,
        });

        const marker = new google.maps.Marker({
          position: {
            lat: latitude || 37.550948,
            lng: longitude || 126.990954,
          },
          animation: google.maps.Animation.DROP,
          map,
        });

        marker.addListener('click', () => {
          if (marker.getAnimation() === null)
            marker.setAnimation(google.maps.Animation.BOUNCE);
          else marker.setAnimation(null);
        });

        map.addListener(
          'center_changed',
          L.throttle(() => {
            const centerlatitude = map.getCenter()?.lat();
            const centerlongitude = map.getCenter()?.lng();
            if (centerlatitude && centerlongitude) {
              marker.setPosition({ lat: centerlatitude, lng: centerlongitude });
              dispatch(registerRyokanActions.setLatitude(centerlatitude));
              dispatch(registerRyokanActions.setLongitude(centerlongitude));
            }
          }, 1000)
        );
      }
    });
  }, [mapRef.current]);

  return (
    <div className="w-full h-outOfHeader text-black col-start-2 animate-fadeInAndUpForm register-form">
      <div className="w-1/2 h-full mx-auto my-0 space-y-10 py-5 ">
        <h1 className="text-2xl">위치 확인을 해주세요.</h1>
        <span className="text-xl text-red-400">
          이동이 필요할 경우, 지도를 움직여 숙소의 위치에 핀을 정확히
          맞춰주세요.
        </span>
        <div ref={mapRef} id="map" className="w-full h-3/4" />
      </div>
    </div>
  );
};

export default RegisterGeometry;
