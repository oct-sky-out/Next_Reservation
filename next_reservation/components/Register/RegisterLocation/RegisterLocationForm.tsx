import { useDispatch } from 'react-redux';
import { useSelector } from 'store';
import { registerRyokanActions } from 'store/registerRyokan';
import Selector from '@/components/common/Selector';
import Input from '@/components/common/Input';
import selectElementSelector from 'lib/utils/selectElementSelector';
import { Contry } from 'lib/staticData/Contries';

type actionFunctionName =
  | 'setCity'
  | 'setDistrict'
  | 'setStreetAddress'
  | 'setDetailAddress'
  | 'setPostCode';

const RegisterLocationForm = () => {
  //* Redux
  const dispatch = useDispatch();
  const {
    contry,
    city,
    district,
    streetAddress,
    detailAddress,
    postCode,
    latitude,
    longitude,
    isValud,
  } = useSelector((selector) => ({
    contry: selector.registerRyokan.location.contry,
    city: selector.registerRyokan.location.city,
    district: selector.registerRyokan.location.district,
    streetAddress: selector.registerRyokan.location.streetAddress,
    detailAddress: selector.registerRyokan.location.detailAddress,
    postCode: selector.registerRyokan.location.postCode,
    latitude: selector.registerRyokan.location.latitude,
    longitude: selector.registerRyokan.location.longitude,
    isValud: selector.registerIsValid.isValid,
  }));

  //*
  const contryKeyFindAfterDispatch = (objKey: string | undefined) => {
    if (objKey) {
      if (objKey in Contry) dispatch(registerRyokanActions.setContry(objKey));
    }
  };
  const locationInputsChanged = (
    { target: { value } }: React.ChangeEvent<HTMLInputElement>,
    actionFunctionName: actionFunctionName
  ) => {
    dispatch(registerRyokanActions[actionFunctionName](value));
  };

  return (
    <>
      <div className="w-full">
        <Selector
          data-testid="contry"
          className="mb-5 h-20 ryokan-bedroom-count-selector"
          disableOption="국가를 선택하세요."
          value={`${contry ? Contry[contry] : '국가를 선택하세요.'}`}
          onChange={(e) =>
            selectElementSelector(e)(contryKeyFindAfterDispatch, Contry)
          }
          options={Object.values(Contry)}
        />
      </div>
      <div className="w-full space-y-5">
        <div className="w-full">
          <label className="my-3 text-xl" htmlFor="city">
            시/도
          </label>
          <Input
            type="text"
            id="city"
            placeholder="시/도를 입력해주세요."
            onChange={(e) => locationInputsChanged(e, 'setCity')}
          />
          <label className="my-3 text-xl" htmlFor="district">
            시/군/구
          </label>
          <Input
            type="text"
            id="district"
            placeholder="시/군/구를 입력해주세요"
            onChange={(e) => locationInputsChanged(e, 'setDistrict')}
          />
        </div>
        <div className="w-full">
          <label className="my-3 text-xl" htmlFor="streetAddress">
            도로명주소
          </label>
          <Input
            type="text"
            id="streetAddress"
            placeholder="도로명주소를 입력해주세요."
            onChange={(e) => locationInputsChanged(e, 'setStreetAddress')}
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
            onChange={(e) => locationInputsChanged(e, 'setDetailAddress')}
          />
          <label className="my-3 text-xl" htmlFor="postAddress">
            우편번호
          </label>
          <Input
            type="text"
            id="postAddress"
            placeholder="우편번호를 입력해주세요"
            onChange={(e) => locationInputsChanged(e, 'setPostCode')}
          />
        </div>
      </div>
    </>
  );
};

export default RegisterLocationForm;
