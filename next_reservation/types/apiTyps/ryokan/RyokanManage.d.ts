import { IRyokanType } from '@/types/reduxActionTypes/ReduxRyokanType';

export type RyokanManageType = IRyokanType & {
  ryokanId: string;
  ryokanManager: string;
};
