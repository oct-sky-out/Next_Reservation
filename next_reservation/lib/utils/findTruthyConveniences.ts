import { convenienceSpacesType } from '@/types/reduxActionTypes/ReduxRyokanType';
import ConvenienceSpaces from '../staticData/ConvenienceSpaces';

const findTruthyConveniences = (convenienceSpaces: convenienceSpacesType) =>
  (Object.keys(convenienceSpaces) as Array<keyof convenienceSpacesType>)
    .map((convenienceKey) => {
      if (convenienceSpaces[convenienceKey])
        return ConvenienceSpaces[convenienceKey];
    })
    .filter((result) => result !== undefined)
    .join(', ');

export default findTruthyConveniences;
