import React from 'react';
import { v4 } from 'uuid';
import ManageRyokanItem from './ManageRyokanItem';
import { RyokanManageType } from '@/types/apiTyps/ryokan/RyokanManage';

interface IManageRyokan {
  ryokans: RyokanManageType[];
}
const ManageRyokan: React.FC<IManageRyokan> = ({ ryokans }) => {
  return (
    <div className="text-black">
      <div className="w-2/3 mx-auto my-10">
        <h1 className="text-3xl">내 료칸 관리</h1>
        <div className="divide-y-2 divide-solid divide-emerald">
          {ryokans.map((ryokan) => (
            <ManageRyokanItem ryokan={ryokan} key={v4()} />
          ))}
        </div>
        {ryokans.length === 0 && (
          <h2 className="text-green-600">관리할 료칸이 없습니다.</h2>
        )}
      </div>
    </div>
  );
};

export default ManageRyokan;
