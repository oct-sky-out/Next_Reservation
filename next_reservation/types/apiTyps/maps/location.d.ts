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

type geocodingResult = {
  plus_code: plusCodeType;
  results: [
    {
      address_components: addressComponentsType[];
      formatted_address: string;
      geometry: geometryType;
      place_id: string;
      plus_code: plusCodeType;
      types: string[];
    }
  ];
  status: string;
};

type geocodingError = {
  error_message: string;
  results: any[];
  status: string;
};

type locationApiType = {
  streetAddress: string;
  district: string;
  city: string;
  contry: string;
  postCode: string;
  latitude: string;
  longitude: string;
};

export { locationApiType, geocodingResult, geocodingError };
