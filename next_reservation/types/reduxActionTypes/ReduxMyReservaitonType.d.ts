import { reservedRyokanType } from '../apiTyps/my/myReservationsId';
import { IRyokanType } from './ReduxRyokanType';

export type MyReservation = {
  reservedRyokan: IRyokanType;
  reservedData: reservedRyokanType;
};

export type MyReservations = Array<MyReservation>;
