export const BedTypes: { [key: string]: string } = {
  single: '싱글 사이즈',
  double: '더블 사이즈',
  queen: '퀸 사이즈',
  king: '킹 사이즈',
  bedding: '요와 이불',
  baby_bed: '유아용 침대',
  waterbed: '물침대',
};

export const BedroomCount = [...Array(15)].map(
  (_, idx) => '침실 ' + (idx + 1) + '개'
);
