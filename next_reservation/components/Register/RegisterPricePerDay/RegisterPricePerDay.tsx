import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { registerRyokanActions } from '@/store/registerRyokan';
import { registerFormValidAction } from '@/store/registerFormIsValid';
import Input from '@/components/common/Input';

const RegisterPricePerDay = () => {
  const dispatch = useDispatch();
  const pricePerDay = useSelector(
    (selector) => selector.registerRyokan.pricePerDay
  );

  useEffect(() => {
    if (+pricePerDay <= 0) dispatch(registerFormValidAction.setValid(false));
    if (+pricePerDay > 0) dispatch(registerFormValidAction.setValid(true));
  }, [pricePerDay]);

  const changePrice = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const locailPrice = +value.replace(/,|₩/g, '');
    console.log(locailPrice.toLocaleString());
    dispatch(
      registerRyokanActions.setPricePerDay(locailPrice.toLocaleString())
    );
  };

  return (
    <div className="w-full h-outOfHeader text-black col-start-2 animate-fadeInAndUpForm register-form overflow-scroll">
      <div className="w-2/3 h-2/3 mx-auto my-5 relative ">
        <div className=" w-full h-1/3 absolute top-1/3 space-y-10">
          <div className="flex flex-col space-y-10">
            <span className="text-2xl">이제, 마지막 절차입니다!</span>
            <span className="text-2xl">숙박료를 입력해주세요.</span>
            <Input
              data-testid="price-input"
              type="text"
              value={'₩ ' + pricePerDay}
              placeholder=""
              onChange={changePrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPricePerDay;
