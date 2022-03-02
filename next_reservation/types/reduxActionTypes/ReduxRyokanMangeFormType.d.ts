import { RyokanManageType } from '../apiTyps/ryokan/RyokanManage';

export type RyokanMangeFormType = {
  ryokanId: string;
  ryokanData: Omit<RyokanManageType, 'ryokanId'>;
};
