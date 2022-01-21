export type PlaceType = {
  description: string;
  matched_substrings: { length: number; offset: number }[];
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: { length: number; offset: number }[];
    secondary_text: string;
  };
  terms: { length: number; value: string }[];
  types: string[];
};

export type PlacesType = {
  predictions: PlaceType[];
  status: string;
};
