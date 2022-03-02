import { IRyokanType } from '@/types/reduxActionTypes/ReduxRegiserRyokanType';

export type RyokanManageType = IRyokanType & {
  ryokanId: string;
  ryokanManager: string;
};
