import { reservedRyokanType } from '../apiTyps/my/myReservationsId';
import { IRyokanType } from './ReduxRegiserRyokanType';

export type MyReservations = Array<{
  reservedRyokan: IRyokanType;
  reservedData: reservedRyokanType;
}>;
