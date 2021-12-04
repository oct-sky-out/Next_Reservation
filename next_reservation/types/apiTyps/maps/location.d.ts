type addressComponentsType = {
  long_name: string;
  short_name: string;
  types: string[];
};
type geometryType = {
  location: {
    lat: number;
    lng: number;
  };
  location_type: number;
  viewport: {
    northeast: {
      lat: number;
      lng: number;
    };
    southwest: {
      lat: number;
      lng: number;
    };
  };
};
type plusCodeType = {
  compound_code: string;
  global_code: string;
};

type resultsType = {
  address_components: addressComponentsType[];
  formatted_address: string;
  geometry: geometryType;
  place_id: string;
  plus_code: plusCodeType;
  types: string[];
};

type geocodingResult = {
  plus_code: plusCodeType;
  results: resultsType[];
  status: string;
};

type geocodingError = {
  error_message: string;
  results: any[];
  status: string;
};

type locationApiType = {
  contry: string;
  address: string;
  postCode: string;
  latitude: number;
  longitude: number;
};

export { locationApiType, geocodingResult, geocodingError };
