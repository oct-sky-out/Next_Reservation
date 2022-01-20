import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { searchRoomActions } from '@/store/searchRoom';
import { v4 } from 'uuid';
import OutsideClickHandler from 'react-outside-click-handler';
import axios from '@/lib/api';
import useReduxDebounce from '../hooks/useReduxDebounce';
import { PlacesType } from '@/types/apiTyps/maps/place';

interface IProps {
  openRecommenationPalce: boolean;
  setOpenRecommenationPalce: (state: boolean) => void;
}

const RecommendationPlace: React.FC<IProps> = ({
  openRecommenationPalce,
  setOpenRecommenationPalce,
}) => {
  const dispatch = useDispatch();
  const { location, latitiude, longitude } = useSelector((state) => ({
    location: state.searchRoom.location,
    latitiude: state.searchRoom.latitude,
    longitude: state.searchRoom.longitude,
  }));

  const initalState: PlacesType = {
    predictions: [],
    status: '',
  };
  const searchLocation = useReduxDebounce(location, 1000);
  const [places, setPlaces] = useState<PlacesType>(initalState);

  useEffect(() => {
    if (searchLocation) {
      axios
        .get<PlacesType>('/api/maps/place', {
          params: { placeName: location },
        })
        .then(({ data }) => setPlaces(data))
        .catch((reason) => console.error(reason));
      setOpenRecommenationPalce(true);
    }
    if (!searchLocation) {
      setPlaces(initalState);
      setOpenRecommenationPalce(false);
    }
  }, [searchLocation]);

  const placeClick = (place: string) => {
    dispatch(searchRoomActions.setLocation(place));
  };

  const changeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchRoomActions.setLocation(e.target.value));
  };

  const clickAroundMyPosition = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      dispatch(searchRoomActions.setLatitude(coords.latitude));
      dispatch(searchRoomActions.setLongitude(coords.longitude));
    });
  };

  return (
    <>
      <span className="text-sm">위치</span>
      <OutsideClickHandler
        onOutsideClick={() => {
          if (openRecommenationPalce) {
            setOpenRecommenationPalce(false);
          }
        }}
      >
        <input
          data-testid="location-input"
          type="text"
          className="form-control h-8 mt-1 p-2 w-full border-0"
          placeholder="위치입력"
          value={location}
          onChange={changeLocation}
          onFocus={() => {
            setOpenRecommenationPalce(true);
          }}
        />
        {openRecommenationPalce && (
          <div className="absolute space-y-10 top-20 p-10 bg-white w-700 rounded-md">
            {places.predictions.length === 0 && (
              <div
                onClick={clickAroundMyPosition}
                className="w-full cursor-pointer"
              >
                <span>내 주변 검색하기</span>
              </div>
            )}
            {places.predictions.map((place) => (
              <div
                key={v4()}
                className="w-full, cursor-pointer"
                onClick={() => {
                  placeClick(place.description);
                }}
              >
                <span>{place.description}</span>
              </div>
            ))}
          </div>
        )}
      </OutsideClickHandler>
    </>
  );
};

export default RecommendationPlace;
