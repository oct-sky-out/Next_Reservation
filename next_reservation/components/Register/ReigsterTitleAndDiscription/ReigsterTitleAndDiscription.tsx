//! component import
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { registerRyokanActions } from '@/store/registerRyokan';
import { registerFormValidAction } from '@/store/registerFormIsValid';
import L from 'lodash';
import Input from '@/components/common/Input';

const RegisterTitleAndDescription = () => {
  const { title, description } = useSelector((selector) => ({
    title: selector.registerRyokan.title,
    description: selector.registerRyokan.description,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!(L.isEmpty(title) && L.isEmpty(description)))
      dispatch(registerFormValidAction.setValid(false));
    if (L.isEmpty(title) && L.isEmpty(description))
      dispatch(registerFormValidAction.setValid(true));
  }, [title, description]);

  const changeTitle = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRyokanActions.setTitle(value));
  };
  const changeDescription = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(registerRyokanActions.setDesctription(value));
  };

  return (
    <div className="w-full h-outOfHeader text-black col-start-2 animate-fadeInAndUpForm register-form overflow-scroll">
      <div className="w-2/3 h-2/3 mx-auto my-5 relative ">
        <div className=" w-full h-1/3 absolute top-1/3 space-y-10">
          <div className="flex flex-col space-y-5">
            <span className="text-2xl">료칸 제목</span>
            <Input
              type="text"
              placeholder="고객들이 볼 료칸의 제목을 적어주세요."
              value={title}
              onChange={changeTitle}
            />
          </div>
          <div className="flex flex-col space-y-5">
            <span className="text-2xl">료칸 설명</span>
            <textarea
              className="form-control resize-none"
              name="ryokan-description"
              placeholder="등록하시려는 료칸은 어떤 특징을 가지고있나요??"
              value={description}
              cols={30}
              rows={10}
              onChange={changeDescription}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterTitleAndDescription;
