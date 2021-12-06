import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'store';
import { registerRyokanActions } from 'store/registerRyokan';
import { registerFormValidAction } from 'store/registerFormIsValid';
import Selector from '@/components/common/Selector';
import Input from '@/components/common/Input';
import { Contry } from 'lib/staticData/Contries';

const RegisterLocationForm = () => {
  //* Redux
  const dispatch = useDispatch();
  const { contry, address, detailAddress, postCode } = useSelector(
    (selector) => ({
      contry: selector.registerRyokan.location.contry,
      address: selector.registerRyokan.location.address,
      detailAddress: selector.registerRyokan.location.detailAddress,
      postCode: selector.registerRyokan.location.postCode,
    })
  );

  useEffect(() => {
    if (contry && address && postCode)
      dispatch(registerFormValidAction.setValid(true));
  }, [contry, address, postCode]);

  const changeContryState = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    const findedConrty = Contry.find((contry) => contry === value);
    if (findedConrty) dispatch(registerRyokanActions.setContry(findedConrty));
  };

  const changeAddressState = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRyokanActions.setAddress(value));
  };

  const changeDetailAddressState = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRyokanActions.setDetailAddress(value));
  };

  const changePostCodeState = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRyokanActions.setPostCode(value));
  };

  return (
    <>
      <div className="w-full">
        <Selector
          className="mb-5 h-20 ryokan-bedroom-count-selector"
          disableOption="국가를 선택하세요."
          value={`${contry ? contry : '국가를 선택하세요.'}`}
          onChange={changeContryState}
          options={Contry}
        />
      </div>
      <div className="w-full space-y-5">
        <div className="w-full">
          <label className="my-3 text-xl" htmlFor="streetAddress">
            도로명주소
          </label>
          <Input
            type="text"
            id="streetAddress"
            placeholder="도로명주소를 입력해주세요."
            value={address}
            onChange={changeAddressState}
          />
        </div>
        <div className="w-full">
          <label className="my-3 text-xl" htmlFor="detailAddress">
            상세주소
          </label>
          <Input
            type="text"
            id="detailAddress"
            placeholder="상세주소를 입력해주세요.(선택)"
            value={detailAddress}
            onChange={changeDetailAddressState}
          />
          <label className="my-3 text-xl" htmlFor="postCode">
            우편번호
          </label>
          <Input
            type="text"
            id="postCode"
            placeholder="우편번호를 입력해주세요"
            value={postCode}
            onChange={changePostCodeState}
          />
        </div>
      </div>
    </>
  );
};

export default RegisterLocationForm;
