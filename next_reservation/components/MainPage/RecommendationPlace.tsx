import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { searchRoomActions } from '@/store/searchRoom';
import { v4 } from 'uuid';
import OutsideClickHandler from 'react-outside-click-handler';
import axios from '@/lib/api';
import { PlacesType } from '@/types/apiTyps/maps/place';

const RecommendationPlace = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.searchRoom.location);

  const initalState: PlacesType = {
    predictions: [
      {
        description: '',
        matched_substrings: [{ length: 0, offset: 0 }],
        place_id: '',
        reference: '',
        structured_formatting: {
          main_text: '',
          main_text_matched_substrings: [{ length: 0, offset: 0 }],
          secondary_text: '',
        },
        terms: [{ length: 0, value: '' }],
        types: [''],
      },
    ],
    status: '',
  };
  const [places, setPlaces] = useState<PlacesType>(initalState);
  const [placeSearchBarOpened, setPlaceSearchBarOpened] = useState(false);
  useEffect(() => {
    if (location) {
      axios
        .get<PlacesType>('/api/maps/place', {
          params: { placeName: location },
        })
        .then(({ data }) => setPlaces(data))
        .catch((reason) => console.error(reason));
      setPlaceSearchBarOpened(true);
    }
    if (!location) {
      setPlaces(initalState);
      setPlaceSearchBarOpened(false);
    }
  }, [location]);

  const placeClick = (place: string) => {
    dispatch(searchRoomActions.setLocation(place));
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        if (placeSearchBarOpened) {
          setPlaceSearchBarOpened(false);
        }
      }}
    >
      {placeSearchBarOpened && (
        <div className="absolute space-y-3 top-20 p-3 bg-white w-700 rounded-md">
          {places.predictions.map((place) => (
            <div
              key={v4()}
              className="w-full"
              onClick={() => {
                placeClick(place.description);
                console.log(place.description);
              }}
            >
              <span>{place.description}</span>
            </div>
          ))}
        </div>
      )}
    </OutsideClickHandler>
  );
};

export default RecommendationPlace;
