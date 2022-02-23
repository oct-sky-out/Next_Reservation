import React, { useEffect, useRef } from 'react';
import { useSelector } from '@/store/index';
import { Loader } from '@googlemaps/js-api-loader';

interface IProps {
  markerInformations: {
    pricePerDay: string;
    latitude: number;
    longitude: number;
  }[];
}

const SearchReslutLocation: React.FC<IProps> = ({ markerInformations }) => {
  const { latitude, longitude } = useSelector((state) => ({
    latitude: state.ryokanDetail.location.latitude,
    longitude: state.ryokanDetail.location.longitude,
  }));
  const mapRef = useRef<HTMLDivElement>(null);
  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '',
    version: 'weekly',
  });

  useEffect(() => {
    loader.load().then(() => {
      if (mapRef.current) {
        mapRef.current.style.overflow = '';
        const map = new google.maps.Map(mapRef.current, {
          center: {
            lat: latitude,
            lng: longitude,
          },
          zoom: 14,
          fullscreenControl: false,
          streetViewControl: false,
        });
        let infowindow = new google.maps.InfoWindow();

        markerInformations.forEach((markerInformation) => {
          const marker = new google.maps.Marker({
            icon: 'https://firebasestorage.googleapis.com/v0/b/next-reservation.appspot.com/o/common%2FVariant4.svg?alt=media&token=c5849e27-3783-4b81-a3bf-ca0bd7a286e0',
            position: {
              lat: markerInformation.latitude,
              lng: markerInformation.longitude,
            },
            animation: google.maps.Animation.DROP,
            map,
          });

          google.maps.event.addListener(marker, 'click', () => {
            const priceText = document.createElement('span');
            priceText.innerText = '₩' + markerInformation.pricePerDay;
            priceText.classList.add('text-black', 'text-xl');

            infowindow.setContent(priceText);
            infowindow.open(map, marker);
          });
        });
      }
    });
  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default React.memo(SearchReslutLocation);
